import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../model/product';
import { FileInfo, FileRestrictions, SelectEvent, UploadEvent } from '@progress/kendo-angular-upload';
import { Category } from '../../model/category';
import { Author } from '../../model/author';
import { Publisher } from '../../model/publisher';
import { CategoryService } from '../../service/category.service';
import { AuthorService } from '../../service/author.service';
import { PublisherService } from '../../service/publisher.service';
import { StatusBook } from '../../model/statusbook';
import { StatusbookService } from '../../service/statusbook.service';
import { BookService } from '../../service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../model/book';
import { SharedataService } from '../../service/sharedata.service';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit  {
    public categoryDefault:{CategoryID:number,CategoryName:string}
    public authorDefault:{AuthorID:number,AuthorName:string}
    public publisherDefault:{PublisherID:number,PublisherName:string}
    public statusDefault:{StatusBookID:number,StatusBookName:string}
    public arrCategory: Category[] = [];
    public arrAuthor: Author[] = [];
    public arrPublisher: Publisher[] = [];
    public arrStatusBook: StatusBook[] = [];
    public imagePreviews:any = [];
    public imgUrl:string='../../../assets/img/default.png'
    public IsNew:boolean;
    public BookID:number;
    public editDataItem: Book;
    public TitleForm:string ="";

    
    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
    uploadRemoveUrl = 'removeUrl';

    public myRestrictions: FileRestrictions = {
        allowedExtensions: ['jpg', 'jpeg', 'png']
    };
    public editForm: FormGroup = new FormGroup({
        'Title': new FormControl('', Validators.required),
        'Summary': new FormControl(),
        'Image': new FormControl(),
        'CategoryID': new FormControl('', Validators.required),
        'AuthorID': new FormControl('', Validators.required),
        'PublisherID': new FormControl(),
        'Price': new FormControl(),
        'Quantity': new FormControl(),
        'StatusBookID': new FormControl(),
        
    });

    public userName: string;
    public userImages: Array<FileInfo>;
  
    constructor(private _categoryService:CategoryService, private authorService:AuthorService,
                private publisherService:PublisherService,private statusbookService:StatusbookService,
                private bookService:BookService,private activeRoute: ActivatedRoute,
                private urlRouter:Router,private _shareDataService: SharedataService 
            ) 
    {
        
        
    }
    ngOnInit()
    {
        this.IsNew = this._shareDataService.ShareData["IsNew"] as boolean;
        this.TitleForm = this._shareDataService.ShareData["Title"] as string;
        this.editDataItem = this._shareDataService.ShareData["Book"] as Book;
        this.editForm.reset(this.editDataItem);
        this.imgUrl = this.editDataItem.ImgUrl;
        this.loadCategory();
        this.loadAuthor();
        this.loadPublisher();
        this.loadStatusBook();

    }
    public loadPublisher()
    {
        this.publisherService.getAllPublisher().subscribe(
            (data) => {
      
              this.arrPublisher = data["data"] as Publisher[];
            }
          )
       
       
    }
    public loadAuthor()
    {
        this.authorService.getAllAuthor().subscribe(
            (data) => {
      
              this.arrAuthor = data["data"] as Author[];
            }
          )
       
       
    }
    public loadCategory()
    {
        this._categoryService.getAllCategory().  subscribe(
            (data) => {
      
              this.arrCategory = data["data"] as Category[];
            }
          )
       
       
    }
    public loadStatusBook()
    {
        this.statusbookService.getAllStatusBook().  subscribe(
            (data) => {
      
              this.arrStatusBook = data["data"] as StatusBook[];
            }
          )
       
       
    }
    
    public onSubmit()
    {
        
       
        
        if(this.IsNew==true)
        {
          
          let  objBook:Book = new Book();
          objBook.Title = this.editForm.value.Title;
          objBook.Summary= this.editForm.value.Summary;
          objBook.CategoryID=this.editForm.value.CategoryID;
          objBook.AuthorID = this.editForm.value.AuthorID;
          objBook.PublisherID= this.editForm.value.PublisherID;
          objBook.Price = this.editForm.value.Price;
          objBook.Quantity = this.editForm.value.Quantity;
          objBook.ImgUrl = this.myFiles[0]["name"];
          objBook.IsActive=true;
          objBook.StatusBookID=this.editForm.value.StatusBookID;
        
          
         
         
          
          this.bookService.postFile(this.frmData).subscribe(data=>{   
              this.bookService.SaveBook(objBook,this.IsNew).subscribe(data => { this.editForm.reset(new Book()) })
            });


        }
        else
        {
          
            if(this.isChangeFile==true)
            {
               
                this.editDataItem.ImgUrl = this.myFiles[0]["name"];
                this.bookService.postFile(this.frmData).subscribe(data=>{   
                    this.bookService.SaveBook(this.editDataItem,this.IsNew).subscribe(data => { this.urlRouter.navigate(['/book-management']) })
                  });
            }
            else{
               
                this.bookService.SaveBook(this.editDataItem,this.IsNew).subscribe(data => { this.urlRouter.navigate(['/book-management']) });

            }
           

        }
      
       
        
    }
    
    myFiles:string [] = [];
    fileToUpload: File = null;
    frmData:FormData;
    isChangeFile : boolean = false;
    onFileChange(e) {
        this.isChangeFile=true;
        this.fileToUpload = e.target.files[0]
        this. frmData = new FormData();
        this.myFiles=[];
        for (var i = 0; i < e.target.files.length; i++) { 
            this.myFiles.push(e.target.files[i])
           
            this.frmData.append("fileUpload",   this.myFiles[i]);
          }
          var reader = new FileReader();
          reader.onload = (event:any) => {
            this.imgUrl = event.target.result;
          }
          reader.readAsDataURL(this.fileToUpload);
      }
   



  

}
