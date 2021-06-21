

const conteinerMessage = document.querySelector('.all-messageB')
const editMessageForm = document.querySelector('.edit-message-form')




if (conteinerMessage) {
  conteinerMessage.addEventListener('click', async (e) => {
    let btnParrent = e.target.parentNode
    console.log();
    if (btnParrent.dataset.name === 'like') {
      let counter = btnParrent.parentNode.firstElementChild
      const respP = await fetch('/', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: btnParrent.dataset.id,
        })
      })
      const responseP = await respP.json()
      console.log(responseP.countLike); 
      
      counter.innerText = `${responseP.countLike}`;
      
    }

    if (btnParrent.dataset.name === 'deleteB') {
      console.log('This work!');
      const resp = await fetch('/profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: btnParrent.dataset.id,
        })
      })
      if (resp.ok) {
        window.location = '/profile'
      }
    }

  })
}




if (editMessageForm) {
  editMessageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(editMessageForm.text.value);
    if (e.target.dataset.name === 'editDeleteB') {
      const resp = await fetch('/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editMessageForm.dataset.id,
          text: editMessageForm.text.value,
        })
      })
      if (resp.ok) {
        window.location = '/profile'
      }
    }
  })
}


