import nc from 'next-connect'
import dbConnect from '../../config/dbConnect';
import { allProducts, newProduct } from '../../controllers/productControllers'
import onError from '../../middlewares/errors'

const handler = nc({ onError });
dbConnect();
handler.get(allProducts)
handler.post(newProduct)
export default handler;