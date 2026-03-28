"use client"

import Heading from "@/components/Heading"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { formSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
   Form,
   FormControl, 
   FormField, 
   FormItem 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant",
  content: string
}


const ConversationPage = () => {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
         try {
            const userMessage: Message = {
              role: "user",
              content: values.prompt
            }
            const newMessages = [...messages, userMessage]
            const response = await axios.post("/api/conversation", {
              messages: newMessages
            });
            setMessages((current) => [...current, userMessage, response.data])
            form.reset()
          
          } catch (error: any) {
          //TODO:  Open Pro Modal
           console.log(error)
         } finally {
           router.refresh()
         }
    }
  return (
   <div>
    <Heading
      title="Conversation"
      description="Our most advance conversation model"
      icon={MessageSquare}
      iconColor="text-violet-500"
      bgColor="bg-violet-500/10"
    />
    <div className="mt-8 px-4 lg:px-8">
       <div>
        <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
              >

                <FormField 
                   name="prompt"
                   render={({field}) => (
                     <FormItem className="col-span-12 lg:col-span-10">
                        <FormControl className="p-0 m-0">
                           <Input
                              className="
                                border-0 
                                outline-none 
                                focus-visible:ring-0 
                                focus-visible:ring-transparent
                              "
                              disabled={isLoading}
                              placeholder={"How do I calculate the radius of a circle"}
                              {...field}

                            />
                        </FormControl>
                     </FormItem>
                   )}
                />
                <Button 
                  className="w-full col-span-12 lg:col-span-2 cursor-pointer"
                  disabled={isLoading}
                 >
                  Generate
                </Button>
            </form>
        </Form>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
          {
            messages.map((message, index) => (
              <div 
                key={index}
                className={cn(
                  "p-4 rounded-md w-full",
                  message.role === "user" ? "bg-white border" : "bg-violet-50 border-violet-200",
                  message.role === "user" ? "text-right" : "text-left"
                )}
              >
                {message.content}
              </div>
            ))
          }
          </div>
        </div>
       </div>
    </div>
   </div>
  )
}

export default ConversationPage