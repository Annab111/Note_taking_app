// const notesContainer = document.getElementById("app");
// const addNoteButton = notesContainer.querySelector(".add-note");

// // getNotes().forEach((note) => {
// //   const noteElement = createNoteElement(note.id, note.content);
// //   notesContainer.insertBefore(noteElement, addNoteButton); 
// // });

// // addNoteButton.addEventListener("click", () => addNote());

// // function getNotes() {
// //   return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
// // }

// // function saveNotes(notes) {
// //   localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
// // }

// function createNoteElement(id, content) {
//   const element = document.createElement("textarea");
//   //var element = document.querySelector('#element');

//   element.classList.add("note");
//   element.value = content;
//   element.placeholder = "Add a Note";
  

//   element.addEventListener("change", (e) => {
//      e.preventDefault(); //
//      db.collection('note').doc(id).set({ //
//       string: element.value  //
//      }).then(()=>{  //
//        location.reload();  //
//      })   //
//     updateNote(id, element.value);
//   });

//   element.addEventListener("dblclick", (e) => {
//     e.preventDefault(); //
//      db.collection('note').doc(id).set({ //
//       string: element.value  //
//      }).then(()=>{  //
//        location.reload();  //
//      })   //
//     const doDelete = confirm(
//       "Are you sure you wish to delete this sticky note?"
//     );

//     if (doDelete) {
//       deleteNote(id, element);
//     }
//   });

//   return element;
// }

// function addNote() {
//   const notes = getNotes();
//   const noteObject = {
//     id: Math.floor(Math.random() * 100000),
//     content: ""
//   };

//   const noteElement = createNoteElement(noteObject.id, noteObject.content);
//   notesContainer.insertBefore(noteElement, addNoteButton);

//   notes.push(noteObject);
//   saveNotes(notes);
// }

// function updateNote(id, newContent) {
//   const notes = getNotes();
//   const targetNote = notes.filter((note) => note.id == id)[0];

//   targetNote.content = newContent;
//   saveNotes(notes);
// }

// function deleteNote(id, element) {
//   const notes = getNotes().filter((note) => note.id != id);

//   saveNotes(notes);
//   notesContainer.removeChild(element);
// }

// console.log("Dashboard loaded")

// var user = firebase.auth().currentUser;
// if(user){
//     console.log("We are logged in")
// } else {
//     console.log("We are not logged in")
// }

// db.collection('note').get().then((querysnapshot)=>{ //
//   querysnapshot.forEach((doc)=>{   //
//     fill(doc.data().string); //
    
//   }) //
// })



var addNoteBTN = document.querySelector('#addNoteBTN');
var addNoteForm = document.querySelector('#addNoteForm');
var app = document.querySelector('#app');
var logoutBTN = document.querySelector('#logoutBTN');
var currentUser = localStorage.getItem('userID');
 
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

logoutBTN.addEventListener('click', ()=>{
  localStorage.clear();
  window.location.href='index.html';
})

addNoteForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  db.collection('note').doc().set({
    userID: currentUser,
    title: addNoteForm.noteTitle.value,
    body: addNoteForm.noteBody.value  
  }).then(()=>{  
    location.reload();  
  }) 
})

db.collection('note').where("userID", "==", currentUser).get().then((querysnapshot)=>{ 
  querysnapshot.forEach((doc)=>{   
    console.log(doc.data());
  
    let newNote = document.createElement("div");
    newNote.classList.add('note');
    newNote.innerHTML = ` 
      <h4>${doc.data().title}</h4>
      <p>${doc.data().body}</p>
      
      <button type="button" class="small material-icons" data-docID="${doc.id}"
      onclick="deleteDoc(this.getAttribute('data-docID'));" onClick="window.alert('Testo del messaggio')"
      >delete</button> 
    `
    app.insertBefore(newNote, addNoteBTN);
  })   
});

function deleteDoc(docID){
  console.log(docID);
    db.collection("note").doc(docID).delete().then(() => {
      console.log("Document successfully deleted!");
      window.alert("Are you sure you wish to delete this note?");
      window.location.reload();
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}




//var deleteNotes = document.querySelectorAll('.deleteNote');  
/////////////////////////

// deleteNotes.forEach((deleteNote)=>{
//   deleteNote.addEventListener('click', (e)=>{
//     console.log(deleteNote);
//     // db.collection('note').doc().delete().then(() => {
//     //   location.reload();
//     //   console.log("Document successfully deleted!");
//     // })
//     //.catch((error) => {
//       //console.error("Error removing document: ", error);
//   //})
//   // const doDelete = confirm(
//   //          "Are you sure you wish to delete this note?"
//   //        );
    
//   //        if (doDelete) {
//   //          deleteNote(`${doc.data().title}`,`${doc.data().body}`);
          
//   //        }
//   //        return newNote;
//   });

// });


  