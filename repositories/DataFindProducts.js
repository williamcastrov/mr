//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://sitbusiness.co/mrp/api";
import Repository, { serializeQuery } from "./Repository";

class DataFindProducts {
    async getDataFindProducts(params) {
        const reponse = await Repository.post(
            `${baseDomain}/999/?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new DataFindProducts();

