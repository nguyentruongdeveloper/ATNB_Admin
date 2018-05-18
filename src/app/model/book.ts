export class Book{
    public  BookID :number
    public  Title :string
    public  CategoryID :number
    public  AuthorID :number
    public  PublisherID :number
    public Summary :string
    public  ImgUrl :string
    public  Price :number
    public  Quantity :number
    public CreateDay :Date
    public ModifiedDay :Date
    public  IsActive :boolean;
    public StatusBookID:number
    /**
     *
     */
    constructor() {
        this.BookID=0;
        this.Title="";
        this.CategoryID=1;
        this.AuthorID=1;
        this.PublisherID=1;
        this.Summary="";
        this.ImgUrl="";
        this.Price=0;
        this.Quantity=0;
        this.IsActive=true;
        this.StatusBookID=1;

        
    }

  
    
}