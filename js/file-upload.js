
const avatarUploadFiled = document.querySelector('.ad-form-header__upload');
const avatarUploadInput = avatarUploadFiled.querySelector('#avatar');
const avatarFilePreview = avatarUploadFiled.querySelector('.ad-form-header__preview').querySelector('img');

const livingplaceFotoUploadField = document.querySelector('.ad-form__photo-container');
const livingplaceFotoInput = livingplaceFotoUploadField.querySelector('#images');
const livingplaceFotoPreview = livingplaceFotoUploadField.querySelector('.ad-form__photo');

const DefaultFotoValues = {
  AVATAR_SRC: 'img/muffin-grey.svg',
  LIVINGPLACE_PREVIEW_ELEMENT_HEIGHT: 40,
  LIVINGPLACE_PREVIEW_ELEMENT_WIDTH: 45,
};


const loadFile = (fileInputElement, previewElement) => {
  const file = fileInputElement.files[0];

  if (!file.type.startsWith('image/')){
    throw new Error('Можно загружать только изображения');
  }

  const fileReader = new FileReader();

  fileReader.addEventListener('load', () => {
    previewElement.src = fileReader.result;
  });

  fileReader.readAsDataURL(file);
};

const onAvatarLoad = () => {
  loadFile(avatarUploadInput, avatarFilePreview);
};

const onLivingplaceFotoLoad = () => {
  const fotoElement = document.createElement('img');

  livingplaceFotoPreview.insertAdjacentElement('beforeend', fotoElement);

  fotoElement.parentElement.style.display = 'flex';
  fotoElement.parentElement.style.alignItems = 'center';
  fotoElement.parentElement.style.justifyContent = 'center';

  fotoElement.width = 45;
  fotoElement.height = 40;
  fotoElement.alt = 'Фотография жилья';

  loadFile(livingplaceFotoInput, fotoElement);
};

const resetAvatarPreview = () => {
  avatarFilePreview.src = DefaultFotoValues.AVATAR_SRC;
};

const resetLivingplacePreview = () => {
  if (livingplaceFotoPreview.querySelector('img')) {
    livingplaceFotoPreview.querySelector('img').remove();
  }
};

const resetAllPreviews = () => {
  resetLivingplacePreview();
  resetAvatarPreview();
};

avatarUploadInput.addEventListener('change', onAvatarLoad);
livingplaceFotoInput.addEventListener('change', onLivingplaceFotoLoad);

export {resetAllPreviews};
