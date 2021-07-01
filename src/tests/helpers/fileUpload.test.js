import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
  cloud_name: 'djcs4ctjx', 
  api_key: '986386755958664', 
  api_secret: 'kcHCv_FT4Mcd0ZzOwJS1Ldcaylk' 
});

describe('Pruebas en fileUpload', () => {
  test('Debe de cargar un archivo y retornar el URL', async() => {
    const resp = await fetch('https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png');
    const img = await resp.blob();

    const file = new File([img], 'image.jpg');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');  

    // Delete image after expected
    const imgSegments = url.split('/');
    const imgId = imgSegments[imgSegments.length - 1].replace('.png', '');

    cloudinary.v2.api.delete_resources(imgId, {}, () => {});
  });

  test('Debe de retornar un new error', () => {
    const file = new File([], 'image.jpg');
    const url = fileUpload(file);

    expect(typeof url).toBe("object");
  })
});
