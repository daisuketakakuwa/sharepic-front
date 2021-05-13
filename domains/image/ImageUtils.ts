import imageCompression from "browser-image-compression";

export default class ImageUtils {

    static async getCompressImageFileAsync(file: File) {
        const options = {
            maxSizeMB: 1
        };
        try {
            // 圧縮画像の生成
            return await imageCompression(file, options);
        } catch (error) {
            console.error("getCompressionImageFileAsync is error", error);
            throw error;
        }
    }

    static async getDataUrlFromFile(file: File) {
        try {
            //プレビュー用のデータULR取得
            return await imageCompression.getDataUrlFromFile(file);
        } catch (error) {
            console.error("getDataUrlFromFile is error", error);
            throw error;
        }
    }

}