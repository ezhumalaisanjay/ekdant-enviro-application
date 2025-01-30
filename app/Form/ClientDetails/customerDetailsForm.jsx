"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


function CustomerDetailsForm() {
  /*
  const [customerRows, setCustomerRows] = useState([{}]); // Initial state with one row
  const [addCustomerClick, setAddCustomerClick] = useState(false); */
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const [formData, setFormData] = useState(
    {
      company_name: "",
      Phone: "",
      Email: "",
      Address: "",
      category: "Customer",
    })

  const formSchema = z.object({
    customerName: z.string(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
    }
  });
/*
  const addCustomerRow = () => {
    if(addCustomerClick === true) {
      setCustomerRows([...customerRows, {}]); // Add a new row to the state
    }
    else {
      setAddCustomerClick(true)
    }
  };
*/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Client Details Form data Submitted", formData);

    await createEESRecord(formData);

    const inputElement = document.querySelectorAll("input");
    inputElement.forEach((input) => {
      input.value = ""
    })
    setIsLoading(false);
    toast({
      title: "Client Data",
      description: "Client Data has been submitted Successfully",
    })
    location.reload();
  }

  return(
    <>
      <div className="p-3 w-full h-[500px] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-4">
              <Card>
                <CardHeader className="font-semibold">Company Details</CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                  <FormField 
                    control={form.control}
                    name="company_name"
                    render={() => 
                      <FormItem>
                        <FormLabel>Name of your company</FormLabel>
                        <FormControl>
                          <Input 
                          name="company_name"
                          onChange={handleInputChange}
                          placeholder="Company Name"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                    <FormField 
                    control={form.control}
                    name="Phone"
                    render={() => 
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                          name="Phone"
                          onChange={handleInputChange}
                          placeholder="Enter your Mobile Number"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                    <FormField 
                    control={form.control}
                    name="Email"
                    render={() => 
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                          name="Email"
                          onChange={handleInputChange}
                          placeholder="Email"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                    <FormField 
                    control={form.control}
                    name="Address"
                    render={() => 
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input 
                          name="Address"
                          onChange={handleInputChange}
                          placeholder="Address"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                  </div>
                </CardContent>
              </Card>
              {/*
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      Customer Details
                    </div>
                    <div>
                      <Button variant="ghost" className="text-blue-500 font-semibold hover:text-blue-400" onClick={addCustomerRow}>Add Customer</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 w-full">
                  <FormField 
                    control={form.control}
                    name="customerName"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input 
                          name="customerName"
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Customer Name"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                    <FormField 
                    control={form.control}
                    name="customerNumber"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                          name="customerNumber"
                          onChange={handleInputChange}
                          placeholder="Mobile Number"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                    <FormField 
                    control={form.control}
                    name="customerEmail"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Personal Email</FormLabel>
                        <FormControl>
                          <Input 
                          name="customerEmail"
                          onChange={handleInputChange}
                          placeholder="Email"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                    <FormField 
                    control={form.control}
                    name="customerAddress"
                    render={() => 
                      <FormItem className="w-full">
                        <FormLabel>Personal Address</FormLabel>
                        <FormControl>
                          <Input 
                          name="customerAddress"
                          onChange={handleInputChange}
                          placeholder="Address"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    />
                  </div>
                  {  addCustomerClick ?
                  customerRows.map((_, index) => (
                    <div key={index} className="flex mt-2 gap-2 w-full">
                      <FormField
                        control={form.control}
                        name={`customerName_${index}`}
                        render={() => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input name={`customerName_${index}`} className="w-full" placeholder="Customer Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`customerNumber_${index}`}
                        render={() => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input name={`customerNumber_${index}`} placeholder="Mobile Number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`customerEmail_${index}`}
                        render={() => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input name={`customerEmail_${index}`} placeholder="Email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`customerAddress_${index}`}
                        render={() => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input name={`customerAddress_${index}`} placeholder="Address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )) : "" }
                </CardContent>
              </Card>*/}
            </div> 

            {/* Submit */}
          <Button type="submit">
            {!isLoading ? "Submit" 
              : <> <Loader2 className="animate-spin" /> Submit </>
            }
          </Button>
          <Button variant="outline" type="reset">Reset</Button>
          </form>
        </Form>
      </div>
    </>
  )
}


export async function createEESRecord(requestData) {
  const apiUrl = "https://0znzn1z8z4.execute-api.ap-south-1.amazonaws.com/Dev/EES_Create_Record";
  requestData["Type"] = "Customer";
  requestData["category"] = "Customer";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default CustomerDetailsForm