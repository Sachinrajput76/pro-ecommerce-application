import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';
import { singleProduct } from '../../../controllers/productControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError });
dbConnect();
handler.get(singleProduct)
export default handler;