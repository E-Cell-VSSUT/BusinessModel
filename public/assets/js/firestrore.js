// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMFdTbL2E_p8zDhwu--nW7QgsnESeMTFI",
    authDomain: "bmodel-ecellvssut.firebaseapp.com",
    databaseURL: "https://bmodel-ecellvssut-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bmodel-ecellvssut",
    storageBucket: "bmodel-ecellvssut.appspot.com",
    messagingSenderId: "853251258064",
    appId: "1:853251258064:web:2a790b3e3001d529d310d5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)
const entriesCollection = collection(db, 'entries')

const form  = document.querySelector('#registration-form')
const error = document.querySelector('#pitchdeck-error')
const loading = document.querySelector('#pitchdeck-loading')
const success = document.querySelector('#form-success')

const showError = () => {
    error.style.display = 'block';
}

const showLoading = () => {
    loading.classList.toggle('d-flex', true)
    loading.classList.toggle('d-none', false)
}

const showSuccess = () => {
    form.style.display = 'none'
    success.style.display = 'grid'
}

const hideHelpers = () => {
    error.style.display = 'none'
    loading.classList.toggle('d-flex', false)
    loading.classList.toggle('d-none', true)
}

form.addEventListener('submit', e => {
    e.preventDefault()
    hideHelpers()
    showLoading()
    const file = form.pitchdeck.files[0]
    const data = {
        teamName: form.startup.value,
        leader: {
            name: form.leader.value,
            email: form.email.value,
            mobile: parseInt(form.mobile.value),
            institute: form.college.value,
        },
        teamSize: parseInt(form.teamSize.value),
        idea: form.idea.value,
        createdAt: new Date()
    }
    console.log({data, file})
    const newFileRef = ref(storage, 'pitch-deck/' + uuidv4() + '-' + data.teamName + '-' + file.name)
    const metadata = {
        contentType: file.type
    }
    uploadBytes(newFileRef, file, metadata)
        .then(snapshot => {
            hideHelpers()
            console.log('uploaded', snapshot)
            return getDownloadURL(snapshot.ref)
        })
        .then(url => {
            data['pitchDeckUrl'] = url
            return addDoc(entriesCollection, data)
        })
        .then(doc => {
            showSuccess()
        })
        .catch(err => {
            showError()
        })
})

// extra
const splBtn = document.querySelector('#special-register-button')
const headerSection = document.querySelector('#header')
const registerSection = document.querySelector('#services')
const navLinks = document.querySelectorAll('#navbar ul li a')

console.log({splBtn, headerSection, registerSection, navLinks})

splBtn.addEventListener('click', e => {
  console.log('clicked')
  headerSection.classList.toggle('header-top', true)
  registerSection.classList.toggle('section-show', true)
  navLinks.forEach((link, idx) => {
    if(idx === 3) {
        link.classList.toggle('active', true)
    } else {
        link.classList.toggle('active', false)
    }
  })
})