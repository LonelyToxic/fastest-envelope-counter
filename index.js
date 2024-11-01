console.time('Время выполнения');

import dotenv from 'dotenv';
import axios from 'axios';
import pLimit from 'p-limit';

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const GROUP_ID = -218375169;
const TARGET_WORD = 'энвилоуп';
const WALL_COUNT = 100;
const COMMENTS_COUNT = 100;
const MAX_RETRIES = 5;
const CONCURRENT_REQUESTS = 15;

if (!ACCESS_TOKEN) {
    console.error('Ошибка: ACCESS_TOKEN не установлен в переменных окружения.');
    process.exit(1);
}

const api = axios.create({
    baseURL: 'https://api.vk.com/method/',
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
    params: {
        v: '5.131',
    },
});

async function fetchWithRetries(method, params, retries = 0) {
    try {
        const response = await api.get(method, { params });
        if (response.data.error) {
            throw new Error(`VK API Error ${response.data.error.error_code}: ${response.data.error.error_msg}`);
        }
        return response.data.response;
    } catch (error) {
        if (retries < MAX_RETRIES) {
            console.warn(`Ошибка при вызове ${method}: ${error.message}. Попытка повторить (${retries + 1}/${MAX_RETRIES})...`);
            await new Promise(res => setTimeout(res, 1000 * (retries + 1)));
            return await fetchWithRetries(method, params, retries + 1);
        } else {
            console.error(`Не удалось выполнить ${method} после ${MAX_RETRIES} попыток.`);
            throw error;
        }
    }
}

async function getAllPosts() {
    let offset = 0;
    let totalCount = 1;
    const allPosts = [];

    while (offset < totalCount) {
        const response = await fetchWithRetries('wall.get', {
            owner_id: GROUP_ID,
            count: WALL_COUNT,
            offset: offset,
            filter: 'owner',
        });

        if (offset === 0) {
            totalCount = response.count;
            console.log(`Всего постов: ${totalCount}`);
        }

        allPosts.push(...response.items);
        offset += WALL_COUNT;

        if (allPosts.length % 100 === 0 || allPosts.length === totalCount) {
            console.log(`Получено постов: ${allPosts.length}/${totalCount}`);
        }
    }

    return allPosts;
}

async function getAllComments(postId) {
    let offset = 0;
    let totalComments = 1;
    const allComments = [];

    while (offset < totalComments) {
        const response = await fetchWithRetries('wall.getComments', {
            owner_id: GROUP_ID,
            post_id: postId,
            count: COMMENTS_COUNT,
            offset: offset,
            sort: 'asc',
        });

        if (offset === 0) {
            totalComments = response.count;
            if (totalComments > 0) {
                console.log(`  Всего комментариев для поста ${postId}: ${totalComments}`);
            }
        }

        allComments.push(...response.items.map(item => item.text));
        offset += COMMENTS_COUNT;

        if (allComments.length % COMMENTS_COUNT === 0 || allComments.length === totalComments) {
            console.log(`  Получено комментариев для поста ${postId}: ${allComments.length}/${totalComments}`);
        }
    }

    return allComments;
}

function countOccurrences(text, word) {
    if (!text) return 0;
    const lowerText = text.toLowerCase();
    const lowerWord = word.toLowerCase();
    let count = 0;
    let pos = 0;

    while (true) {
        pos = lowerText.indexOf(lowerWord, pos);
        if (pos === -1) break;
        count++;
        pos += lowerWord.length;
    }

    return count;
}

async function main() {
    let envelopeCount = 0;

    try {
        const posts = await getAllPosts();
        const limit = pLimit(CONCURRENT_REQUESTS);
        const postPromises = posts.map(post => limit(async () => {
            let postCount = 0;

            if (post.comments && post.comments.count > 0) {
                const comments = await getAllComments(post.id);
                for (const comment of comments) {
                    postCount += countOccurrences(comment, TARGET_WORD);
                }
            }

            console.log(`Пост ID ${post.id} обработан.`);
            return postCount;
        }));

        const results = await Promise.all(postPromises);
        envelopeCount = results.reduce((acc, curr) => acc + curr, 0);

        console.log(`\nКоличество "${TARGET_WORD}" в комментариях: ${envelopeCount}`);
    } catch (error) {
        console.error(`Произошла ошибка: ${error.message}`);
    }
}

main().then(() => {
    console.timeEnd('Время выполнения');
});
