const posts = [];

const createPost = (title, description) => {
    const newPost = {
        title,
        description,
        date: new Date().toLocaleString(),
        comments: []
    };
    posts.push(newPost);
    displayPosts();
};

const displayPosts = () => {
    $('#posts').empty();
    posts.forEach((post, index) => {
        const postElement = $(`
            <li class="post">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <small>Fecha: ${post.date}</small>
                <button class="edit-post" data-index="${index}">Editar</button>
                <button class="delete-post" data-index="${index}">Eliminar</button>
                <div class="comments">
                    <input type="text" class="comment-input" placeholder="Agregar un comentario" data-index="${index}" />
                    <ul class="comments-list"></ul>
                </div>
            </li>
        `);

        postElement.find('.edit-post').click(editPost);
        postElement.find('.delete-post').click(deletePost);
        postElement.find('.comment-input').keypress(addComment);

        // Mostrar los comentarios y agregar botones para eliminar comentarios
        displayComments(postElement, post, index);

        $('#posts').append(postElement);
    });
};

const editPost = (e) => {
    const index = $(e.target).data('index');
    const newTitle = prompt('Nuevo título', posts[index].title);
    const newDescription = prompt('Nueva descripción', posts[index].description);
    if (newTitle) posts[index].title = newTitle;
    if (newDescription) posts[index].description = newDescription;
    displayPosts();
};

const deletePost = (e) => {
    const index = $(e.target).data('index');
    posts.splice(index, 1);
    displayPosts();
};

const addComment = (e) => {
    if (e.which === 13) {  // Enter key
        const index = $(e.target).data('index');
        const comment = $(e.target).val();
        if (comment) {
            posts[index].comments.push(comment);
            $(e.target).val(''); // Limpiar el campo de texto
            displayPosts();
        }
    }
};

// Función para mostrar los comentarios y agregar botones de eliminación
const displayComments = (postElement, post, index) => {
    post.comments.forEach((comment, commentIndex) => {
        postElement.find('.comments-list').append(`
            <li class="comment">
                ${comment}
                <button class="delete-comment" data-post-index="${index}" data-comment-index="${commentIndex}">Eliminar</button>
            </li>
        `);
    });

    // Asociamos la eliminación de comentarios
    postElement.find('.delete-comment').click(deleteComment);
};

// Función para eliminar un comentario
const deleteComment = (e) => {
    const postIndex = $(e.target).data('post-index');
    const commentIndex = $(e.target).data('comment-index');
    posts[postIndex].comments.splice(commentIndex, 1); // Eliminar el comentario del array
    displayPosts(); // Actualizar la lista de posts
};

$('#create-post-btn').click(() => {
    const title = $('#post-title').val();
    const description = $('#post-description').val();
    if (title && description) {
        createPost(title, description);
        $('#post-title').val('');
        $('#post-description').val('');
    }
});

$('#search').keyup(() => {
    const keyword = $('#search').val().toLowerCase();
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(keyword));
    displayFilteredPosts(filteredPosts);
});

const displayFilteredPosts = (filteredPosts) => {
    $('#posts').empty();
    filteredPosts.forEach((post, index) => {
        const postElement = $(`
            <li class="post">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <small>Fecha: ${post.date}</small>
                <button class="edit-post" data-index="${index}">Editar</button>
                <button class="delete-post" data-index="${index}">Eliminar</button>
                <div class="comments">
                    <input type="text" class="comment-input" placeholder="Agregar un comentario" data-index="${index}" />
                    <ul class="comments-list"></ul>
                </div>
            </li>
        `);

        postElement.find('.edit-post').click(editPost);
        postElement.find('.delete-post').click(deletePost);
        postElement.find('.comment-input').keypress(addComment);

        // Mostrar los comentarios y agregar botones para eliminar comentarios
        displayComments(postElement, post, index);

        $('#posts').append(postElement);
    });
};
