import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

function SignUpForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {checkAuthUser} = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name:'',
      username: '',
      email: "",
      password: "",
    },
  });

  async function onSubmit(user: z.infer<typeof SignUpValidation>) {
     const newUser = await createUserAccount(user);
    
     if(!newUser){
      return toast({
        title: "Sign-UP failed! Please Try again later.",
      });
     }

     //const session = await signInAccount();
     const session = await signInAccount({
      email: user.email,
      password: user.password,
    });
    if (!session) {
      toast({ title: "Something went wrong. Please login your new account", });
      
      navigate("/sign-in");
      
      return;
    }
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/');
    }else {
      return toast({title: 'Sign Up failed please try again'})
    }
    }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col justify-center items-start">
        <div className="flex justify-center items-center ">
          <img className="w-auto h-16" src="/assets/SM-logo.png" alt="logo" />
          <p className="ml-2 text-4xl font-bold">CloudIt</p>
        </div>

        <h2 className="h4-bold md:h3-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use cloudIt, Please enter your details
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="shad-input" placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="shad-input" placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input className="shad-input" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="shad-input" type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  
          <Button type="submit" className="shad-button_primary w-60" >
            {isCreatingAccount ? (
              <div className="text-bold flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignUpForm;
