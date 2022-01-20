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
    if(document.querySelector('#containerChecklist #sectionCheck :first-child')) document.querySelector('#containerChecklist #sectionCheck :first-child').remove();
}
export const openModalCheck = (param) =>{
    document.querySelector('#containerChecklist').setAttribute('style', 'display:flex')
    document.querySelector('#containerChecklist #sectionCheck').insertAdjacentHTML('beforeend',param)
}
export const $ = document.querySelector.bind(document);
export const $_all = document.querySelectorAll.bind(document);
export const getB_id = document.getElementById.bind(document);