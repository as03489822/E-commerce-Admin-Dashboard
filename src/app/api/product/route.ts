import { NextRequest , NextResponse } from "next/server";
import Product from "@/models/Product";
import dbConnect from "@/config/dbConnect";
import { uploadImageToCloudinary } from "@/config/cloudinary";


export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching products', error },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    console.log(formData);
    // Get fields
    const productName = formData.get('productName') as string;
    const productDescription = formData.get('productDescription') as string;
    const productPrice = parseFloat(formData.get('productPrice') as string);
    const productQuantity = parseInt(formData.get('productQuantity') as string);
    const productCategory = formData.get('productCategory') as string;

    const file = formData.get('productImage') as File | null;
    console.log('product category' , productCategory)

    let productImageUrl: string | null = null;
    let productImagePublicId: string | null = null;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mime = file.type;
    const base64 = buffer.toString('base64');
    const dataUri = `data:${mime};base64,${base64}`;

    const result = await uploadImageToCloudinary(dataUri);
    productImageUrl = result.secure_url;
    productImagePublicId = result.public_id;
  }

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      productQuantity,
      productCategory,
      image:{
        productImageUrl,
        productImagePublicId,
      }
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json({data:savedProduct , message:'Product added successfully'}, { status: 201 });

  } catch (error) {
    console.log('Error creating product:', error);
    return NextResponse.json({ message: 'Error creating product', error }, { status: 500 });
  }
}