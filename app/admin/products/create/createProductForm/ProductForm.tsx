"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/productActions";
import { UploadButton } from "@/lib/uploadthing";
import { insertProductSchema, updateProductSchema } from "@/lib/validator";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";
const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  type FormSchema =
    | z.infer<typeof insertProductSchema>
    | z.infer<typeof updateProductSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(
      type === "Update" ? updateProductSchema : insertProductSchema
    ),
    defaultValues:
      product && type === "Update"
        ? { ...product, id: productId || product.id }
        : {
            name: "",
            slug: "",
            category: "",
            brand: "",
            description: "",
            stock: 0,
            images: [],
            isFeatured: false,
            banner: null,
            price: "0",
          },
  });
  const images = useWatch({
    control: form.control,
    name: "images",
    defaultValue: [],
  });
  const isFeatured = useWatch({
    control: form.control,
    name: "isFeatured",
    defaultValue: false,
  });
  const banner = useWatch({
    control: form.control,
    name: "banner",
    defaultValue: null,
  });

  const onSubmit: SubmitHandler<FormSchema> = async (values) => {
    if (type === "Create") {
      const res = await createProduct(values);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push(`/admin/products`);
      }
    }
    if (type === "Update") {
      if (!productId) {
        router.push(`/admin/products`);
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        router.push(`/admin/products`);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product name' {...field} />
                </FormControl>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className='flex  gap-2'>
                    <Input placeholder='Enter product slug' {...field} />
                    <button
                      type='button'
                      className='bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 rounded'
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true }),
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='Enter category' {...field} />
                </FormControl>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product brand' {...field} />
                </FormControl>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product price' {...field} />
                </FormControl>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Enter product stock'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='images'
            render={() => (
              <FormItem className='w-full'>
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='flex-start space-x-2'>
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt='product image'
                          className='w-20 h-20 object-cover object-center rounded-sm'
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue("images", [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`, {
                              style: {
                                color: "white",
                                backgroundColor: "red",
                                borderRadius: "5px",
                                padding: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                maxWidth: "300px",
                                margin: "0 auto",
                                zIndex: 9999,
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.3s ease-in-out",
                              },
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
        </div>
        <div className='upload-field'>
          {" "}
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2  '>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='space-x-2 items-center'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt='banner image'
                  className=' w-full object-cover object-center rounded-sm'
                  width={1920}
                  height={680}
                />
              )}
              {isFeatured && !banner && (
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue("banner", res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    toast(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='min-h-[20px]' />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ProductForm;
