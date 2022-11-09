function main() {

  const baseUrl = 'https://books-api.dicoding.dev';

  const getBook = () => {
    // tuliskan kode di sini!
    // membuat instance dari XMKHttpRequest
    const xhr = new XMLHttpRequest();

    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);

      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderAllBooks(responseJson.books);
      }
    };

    xhr.onerror = function() {
      showResponseMessage();
    };

    // membuat Get request dan menetapkan target url
    xhr.open('GET', `${baseUrl}/list`);

    // mengirimkan request
    xhr.send();

  };


  const insertBook = (book) => {
    // membuat instance dari XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook;
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    // membuat POST request dan menetapkan target url
    xhr.open('POST', `${baseUrl}/add`);

    // menetapkan properti COntent-Type dan X-Auth-Token pada Header request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    // mengirimkan request dan menyisipkan JSON.stringify(book)
    xhr.send(JSON.stringify(book));

  };

  const updateBook = (book) => {
    // membuat instance dari XMLHttpRequst
    const xhr = new XMLHttpRequest();

    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    };
    
    xhr.onerror = function () {
      showResponseMessage();
    };
    
    // membuat PUT request dan menetapkan target Url
    xhr.open('PUT', `${baseUrl}/edit/${book.id}`);

    // menetapkan properti Content-Type dan X-auth-token
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');

    // mengirimkan request dan menyisipman JSON.stringify(book) pada body

    xhr.send(JSON.stringify(book));
  };

  const removeBook = (bookId) => {
    // membuat instance dari XMLHttpRequst
    const xhr = new XMLHttpRequest();

    // menetapkan callback jika response sukses dan error
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getBook();
    };

    xhr.onerror = function () {
      showResponseMessage();
    };

    // membuat PUT request dan menetapkan target Url
    xhr.open('DELETE', `${baseUrl}/delete/${bookId}`);

    // menetapkan properti X-auth-token
    xhr.setRequestHeader('X-Auth-Token', '12345');

    // mengirimkan request dan menyisipman JSON.stringify(book) pada body

    xhr.send();
  };


  
  
  
  
  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;