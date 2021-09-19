export default class Api {
    public static fetch = async (url: string) => {
        try {
            let response, data;
            response = await fetch(url);
            data = await response.json();
            return data;
        } catch (exception) {
            return exception
        }
    };
}
