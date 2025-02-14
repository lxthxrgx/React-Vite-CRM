const API = "https://192.168.0.106:8089/api/"

export async function GetPdfData() {
    try {
        const response = await fetch(API + "pdfview", { method: "GET" });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка получения PDF данных:", error);
        throw error;
    }
}

// (API + `pdfview/getpdffile?id=${id}`)

export async function GetPdfPath(id: number) {
    try {
      const response = await fetch(API + `pdfview/getpdflink?id=${id}`);
      if (!response.ok) {
        throw new Error(`Ошибка при получении PDF: ${response.statusText}`);
      }
  
      const data = await response.json();

      if (data && Array.isArray(data)) {
        return data;
      } else {
        console.error('Ошибка: поле "Urls" отсутствует или не является массивом');
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export async function GetCounterpartyData() {
    try {
        const response = await fetch(API + "counterparty", { method: "GET" });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка получения PDF данных:", error);
        throw error;
    }
}

// export function SendError(error:unknown)
// {

// }