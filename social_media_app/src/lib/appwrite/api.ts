import { INewUser } from "@/types";
import {appwriteconfig, account, avatars, databases } from "./config";
import {ID} from 'appwrite';
export async function createUserAccount(user:INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
          });
        return newUser;
    } catch(e){
        console.log(e);
        return e;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
  }) {
    try {
      const newUser = await databases.createDocument(
        appwriteconfig.databaseId,
        appwriteconfig.userCollectionId,
        ID.unique(),
        user
      );
  
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }