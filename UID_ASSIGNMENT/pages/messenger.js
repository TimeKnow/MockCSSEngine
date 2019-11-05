function messengerOnClick(){
    const mess = document.getElementById('messenger');
    const messBodu = document.getElementById('messengerBody');
    if(mess.className.match(/closed/)) {
        openMessenger(mess, messBodu);
    }
    else{
        closeMessenger(mess, messBodu);
    }
}

function openMessenger(mess, messBodu){
    mess.classList.remove('closed');
    mess.classList.add('opened');
    messBodu.classList.remove('closed');

}

function closeMessenger(mess, messBodu){
    mess.classList.remove('opened');
    mess.classList.add('closed');
    messBodu.classList.add('closed');
}
