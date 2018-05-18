export class User
{
   private  UserName:string ;
   private Password:string;
   private Email :string;
   private IsActive:boolean;
   private Created :Date
   /**
    *
    */
   constructor() {
      this.UserName="";
      this.Password="";
      this.IsActive=false;
      
   }
}