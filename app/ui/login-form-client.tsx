"use client";
import { z } from 'zod'
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { lusitana } from '@/app/ui/fonts/fonts';
//import { SignUpSchema, SignUpSchemaType } from '@/app/schema/schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3)
    .max(20),
});
type SignUpSchemaType = z.infer<typeof SignUpSchema>;



import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

interface LoginForm {
  email: string;
  password: string;
}

export default function Page() {
  const initialData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl");
  const [formData, setFormData] = useState<LoginForm>(initialData);


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  //onChange={(event) => handleInputChange(event)}

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    const a=true;

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: callBackUrl ? "/" : "/dashboard",
      });
      
      console.log('res='+res);
  
  };


  const handleSubmitTwo = async (e: FormEvent) => {
    e.preventDefault();
   /* const formDataTPass = new FormData(e.target as HTMLFormElement);
    setFormData({
        ...formData,
        email: formDataTPass.get("email") as string,
      });
      setFormData({
        ...formData,
        password: formDataTPass.get("password") as string,
      });*/


    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: callBackUrl ? "/" : "/dashboard",
    });

      setFormData(initialData);
      console.log("Submitted...", res);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Veuillez vous loguer
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
          
                name="email"
                placeholder="Saisir votre mail"

                {...register("email")}
      
              />    {errors.email && <span>{errors.email.message}</span>}
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
               
                name="password"
                placeholder="Saisir votre mot de passe"
           
                //onChange={(event) => handleInputChange(event)}
                {...register("password")}
              /> {errors.password && <span>{errors.password.message}</span>}
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="submit" value="login" />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
   
        </div>
      </div>
    </form>
  );
};
