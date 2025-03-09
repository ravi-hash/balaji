import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore"; // Firebase imports remain the same
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config"; // Firebase DB import remains the same
import Card from "../../card/Card";
import Spinner from "../../spinner/Spinner";
import { selectProducts } from "../../../redux/slice/productSlice";
import { Client, Storage } from "appwrite"; // Appwrite imports
import { v4 as uuidv4 } from "uuid";
import "./AddProduct.scss";

// Initialize Appwrite client and storage
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite endpoint
  .setProject("67cd705d00240a4d87ee"); // Appwrite Project ID

const storage = new Storage(client);
const bucketId = "67cd74c3003bf8668e7f"; // Your Appwrite Bucket ID

const categories = [
  { id: 1, name: "Visiting Cards" },
  { id: 2, name: "Banner" },
  { id: 3, name: "Custom T-shirts" },
  { id: 4, name: "Photo Albums" },
  { id: 4, name: "personalised-mugs" },
  { id: 4, name: "Photo Gifts" },
  { id: 4, name: "Payment QR Code" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  model: "",
  releaseDate: "",
  modelNumber: "",
  weight: 0,
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const fileId = uuidv4(); // Unique ID for the file

    try {
      // Uploading image to Appwrite Storage
      const fileUpload = await storage.createFile(bucketId, fileId, file);

      // Get the public URL to view the file
      const fileViewURL = storage.getFileView(bucketId, fileUpload.$id);

      // Set the imageURL in product state
      setProduct({ ...product, imageURL: fileViewURL });
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        model: product.model,
        releaseDate: product.releaseDate,
        modelNumber: product.modelNumber,
        weight: Number(product.weight),
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      // Optional: If you want to delete the old image, use this Appwrite API method.
      // storage.deleteFile(productEdit.imageURL);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        model: product.model,
        releaseDate: product.releaseDate,
        modelNumber: product.modelNumber,
        weight: Number(product.weight),
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="add-product-wrap">
      {isLoading && <Spinner />}
      <div className="add-product">
        <h3>{detectForm(id, "Add New Product", "Edit Product")}</h3>
        <Card>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <div className="--form-control">
              <label>Product name:</label>
              <input
                type="text"
                placeholder="Product name"
                required
                name="name"
                value={product.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="--form-control">
              <label>
                Product image:{" "}
                <p className="--small-para">
                  (Select maximum 1 image and image size should be less than
                  2mb)
                </p>
              </label>

              <Card>
                {uploadProgress === 0 ? null : (
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress < 100
                        ? `Uploading ${uploadProgress}`
                        : `Upload Complete ${uploadProgress}%`}
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  placeholder="Product Image"
                  name="image"
                  multiple={false}
                  onChange={(e) => handleImageChange(e)}
                  required
                />

                {product.imageURL && (
                  <div>
                    <p>Uploaded Image:</p>
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      style={{ width: "200px", height: "auto" }}
                    />
                  </div>
                )}
              </Card>
            </div>

            {/* Continue the rest of the form fields */}
            <div className="--form-control">
              <label>Product price:</label>
              <input
                type="number"
                placeholder="Product price"
                required
                name="price"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="--form-control">
              <label>Product Category:</label>
              <select
                required
                name="category"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  -- choose product category --
                </option>
                {categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Continue with the rest of the form */}
            <button className="button --btn --bg-green">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
