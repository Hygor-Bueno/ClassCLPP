export const closeModal = () => {
    document.querySelector('.container').setAttribute('style', 'display:none')
    if(document.querySelector('.container :first-child')) document.querySelector('.container :first-child').remove();
}
export const openModal = (param) =>{
    document.querySelector('.container').setAttribute('style', 'display:flex')
    document.querySelector('.container ').insertAdjacentHTML('beforeend',param)
}
export const closeModalCheck = () => {
    document.querySelector('#containerChecklist').setAttribute('style', 'display:none')
    if(document.querySelector('#containerChecklist section :first-child')) document.querySelector('#containerChecklist section :first-child').remove();
}
export const openModalCheck = (param) =>{
    document.querySelector('#containerChecklist').setAttribute('style', 'display:flex')
    document.querySelector('#containerChecklist section').insertAdjacentHTML('beforeend',param)
}
export const $ = document.querySelector.bind(document);
export const $_all = document.querySelectorAll.bind(document);
export const getB_id = document.getElementById.bind(document);