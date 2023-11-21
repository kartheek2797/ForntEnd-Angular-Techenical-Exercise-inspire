import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  editForm: FormGroup | undefined;
  title = 'assignment';
  data: any;
  bookList:any
  selectedValue: any;
  visible: boolean = false;
  textField =true;
  uploadField =false;
  filePath:any;
  author:any;
  birthPlace: any;
  birthday: any;
  saveBtn = false
  addBtn = false
  constructor(private http:HttpClient, private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.http.get('https://s3.amazonaws.com/api-fun/books.json').subscribe((res)=>{
      console.log(res)
      this.data = res;
      this.author = this.data.data.author
      this.bookList = this.data.data.books
      this.birthPlace = this.data.data.birthPlace
      this.birthday = this.data.data.birthday
      this.sort("titleA")
    })

    this.editForm = this.formBuilder.group({
      newTitle: [''],
      toggleCheckbox: [false],
      textImageField: [''],
      fileImageField: [''],
      newPurchaseUrl: [''],
      newPublishDate: [''],
      oldTitle: ['']
    });
  }

  toggleFields() {
    const toggleCheckboxValue = this.editForm?.get('toggleCheckbox')?.value;
    if (toggleCheckboxValue === true) {
      this.editForm?.get('textImageField')?.disable();
      this.editForm?.get('fileImageField')?.enable();
    } else {
      this.editForm?.get('textImageField')?.enable();
      this.editForm?.get('fileImageField')?.disable();
    }
  }
  


  sort(booksData:any){
    if(typeof booksData === 'object'){
      this.selectedValue = booksData.target.value
    }
    else{
      this.selectedValue = booksData
    }
    if(this.selectedValue == 'titleA'){
      this.bookList.sort((a:any,b:any) => a.title.localeCompare(b.title))
    }
    else if(this.selectedValue == 'publishDateA'){
      this.bookList.sort((a:any,b:any) => a.PublishDate.localeCompare(b.PublishDate))
    }
    else if(this.selectedValue == 'titleD'){
      this.bookList.sort((a:any,b:any) => b.title.localeCompare(a.title))
    }
    else if(this.selectedValue == 'publishDateD'){
      this.bookList.sort((a:any,b:any) => b.PublishDate.localeCompare(a.PublishDate))
    }
  }

  showDialog(book:any) {
    this.visible = true;
    this.editForm = this.formBuilder.group({
      newTitle: [book.title],
      textImageField: [book.imageUrl],
      toggleCheckbox:[false],
      fileImageField: [''],
      newPurchaseUrl: [book.purchaseLink],
      newPublishDate: [book.PublishDate],
      oldTitle: [book.title]
    });
    this.toggleFields()
    this.saveBtn = true
  }
  fileChange(event:any){
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContents = reader.result;
        this.filePath = fileContents
      };
      reader.readAsDataURL(file);
    }
  
  }
  saveEdit(){
    const newTitle = this.editForm?.get('newTitle')?.value;
    const newPurchaseUrl = this.editForm?.get('newPurchaseUrl')?.value;
    const newPublishDate = this.editForm?.get('newPublishDate')?.value;
    const oldTitle = this.editForm?.get('oldTitle')?.value;
    let newImage;

    const checkedStatus = this.editForm?.get('toggleCheckbox')?.value;
    if(checkedStatus){
      newImage = this.filePath
    }
    else{
      newImage = this.editForm?.get('textImageField')?.value
    }
    const bookToEdit = this.data.data.books.find((book:any) => book.title === oldTitle);
    if (bookToEdit) {
        bookToEdit.title = newTitle;
        bookToEdit.imageUrl = newImage;
        bookToEdit.purchaseLink = newPurchaseUrl;
        bookToEdit.PublishDate = newPublishDate;
    }

    this.bookList = this.data.data.books
    this.visible = false;
    this.saveBtn = false
  }
  delete(deletebook:any){
    const bookIndex = this.data.data.books.findIndex((book:any) => book.title === deletebook.title);
    if (bookIndex !== -1) {
      this.data.data.books.splice(bookIndex, 1);
      this.bookList = this.data.data.books
    }
  }
  addNew(){
    this.visible = true;
    this.editForm = this.formBuilder.group({
      newTitle: [''],
      textImageField: [''],
      toggleCheckbox:[false],
      fileImageField: [''],
      newPurchaseUrl: [''],
      newPublishDate: [''],
      oldTitle: ['']
    });
    this.toggleFields()
    this.addBtn = true
  }
  addBook(){
    const newTitle = this.editForm?.get('newTitle')?.value;
    const newPurchaseUrl = this.editForm?.get('newPurchaseUrl')?.value;
    const newPublishDate = this.editForm?.get('newPublishDate')?.value;
    const oldTitle = this.editForm?.get('oldTitle')?.value;
    let newImage;

    const checkedStatus = this.editForm?.get('toggleCheckbox')?.value;
    if(checkedStatus){
      newImage = this.filePath
    }
    else{
      newImage = this.editForm?.get('textImageField')?.value
    }
    const newBook = {
      title: newTitle,
      imageUrl: newImage,
      purchaseLink: newPurchaseUrl,
      PublishDate: newPublishDate
  };
    this.bookList.push(newBook)
    this.sort("titleA")
    this.visible = false;
    this.addBtn = false
  }
}
