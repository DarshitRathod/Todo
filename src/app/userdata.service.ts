import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private userAndTodoData =  {
    "user": [{
            "id": 1,
            "firstName": "Bhavik",
            "lastName": "Mulia",
            "email": "bhavik.mulia@searce.com"
        },
        {
            "id": 2,
            "firstName": "Gaurav",
            "lastName": "Chauhan",
            "email": "gaurav.chauhan@searce.com"
        },
        {
            "id": 3,
            "firstName": "Nirav",
            "lastName": "Tilala",
            "email": "nirav.tilala@searce.com"
        }
    ],
    "todo": [{
            "id": 1,
            "userid": 1,
            "task": "Todo 1",
            "description": "Todo 1 Description"
        },
        {
            "id": 2,
            "userid": 1,
            "task": "Todo 2",
            "description": "Todo 2 Description"
        },
        {
            "id": 3,
            "userid": 2,
            "task": "Todo 3",
            "description": "Todo 3 Description"
        }
    ]
  }

  public getUserData(){
    return this.userAndTodoData['user'];
  }

  public getTodoData(){
    return this.userAndTodoData['todo'];
  }

  //Users Operations
  addUser(row_obj){
    let isUserExist = false;
    this.userAndTodoData['user'].forEach((element) => {
      if (element.email.toString() === row_obj.email) {
        isUserExist = true;
      }
    });

    //If flag === false then push data
    if(!isUserExist){
      this.userAndTodoData['user'].push({
            id: this.userAndTodoData['user'].length + 1,
            firstName:row_obj.firstName,
            lastName:row_obj.lastName,
            email:row_obj.email
      })
     return true;
    }
    return false;
  }
  editUser(row_obj){
    this.userAndTodoData['user'].forEach((element) => {
      if(element.id === row_obj.id){
        element.id === row_obj.id
        element.email = row_obj.email;
        element.firstName = row_obj.firstName;
        element.lastName = row_obj.lastName;
      }
    })
    return true
  }
  deleteUser(row_obj){
    let isUserTodoExist = true;
    this.userAndTodoData['todo'].forEach((element) => {
      if (element.userid === row_obj.id) {
          isUserTodoExist=false;
      }
    });
    if(!isUserTodoExist){
      return false;
    }else{
        let i = 0
        this.userAndTodoData['user'].forEach((element)=>{
        if(element.id === row_obj.id){
          this.userAndTodoData['user'].splice(i,1);
        }
        i++;
      })
      return true;
    }
  }

  //Todos operations
  addTodo(row_obj,chooseUser){
    this.userAndTodoData['todo'].push({
        id: this.userAndTodoData['todo'].length + 1,
        userid:chooseUser,
        task:row_obj.task,
        description:row_obj.description
    })
    return true;
  }
  editTodo(row_obj,chooseUser){
      this.userAndTodoData['todo'].forEach((element) => {
      if(element.id === row_obj.id && element.userid === chooseUser){
        element.description = row_obj.description;
        element.task = row_obj.task;
        element.id = row_obj.id;
        element.userid = chooseUser;
      }
   })
   return true;
  }
  deleteTodo(row_obj,chooseUser){
    let i = 0
    this.userAndTodoData['todo'].forEach((element)=>{
      if(element.id === row_obj.id && element.userid === chooseUser){
        this.userAndTodoData['todo'].splice(i,1);
      }
      i++;
    })
    return true;
  }
  constructor() { }
}
