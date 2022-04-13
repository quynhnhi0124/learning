
async function getToDoList()
{
    try {
        const posts = await fetch('https://jsonplaceholder.typicode.com/todos')
        return posts.json();
    } catch {
        const error = new Error('error');
        throw error;
    }
}

export default getToDoList;