const addComment = (e) => {
    if (e.which === 13) {  // Enter key
        const index = $(e.target).data('index');
        const comment = $(e.target).val();
        if (comment) {
            posts[index].comments.push(comment);
            $(e.target).val(''); // Limpiar el campo de texto
            displayCommentsForPost(index); // Mostrar los comentarios nuevamente
        }
    }
};

const displayCommentsForPost = (postIndex) => {
    const post = posts[postIndex];
    const postElement = $(`#posts li:eq(${postIndex})`);
    postElement.find('.comments-list').empty();

    post.comments.forEach((comment, commentIndex) => {
        postElement.find('.comments-list').append(`
            <li class="comment">
                ${comment}
                <button class="delete-comment" data-post-index="${postIndex}" data-comment-index="${commentIndex}">Eliminar</button>
            </li>
        `);
    });

    postElement.find('.delete-comment').click(deleteComment);
};

const deleteComment = (e) => {
    const postIndex = $(e.target).data('post-index');
    const commentIndex = $(e.target).data('comment-index');
    posts[postIndex].comments.splice(commentIndex, 1); // Eliminar el comentario del array
    displayCommentsForPost(postIndex); // Actualizar los comentarios del post
};
