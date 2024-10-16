import { useEffect, useState } from 'react';
import { TWishlist } from '../../types/Wishlist';
import { useFirestore } from '../../hooks/useFirestore';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { closeUpsertWishlistModal } from '../../store/wishlistSlice';
import Modal, { ModalButtons } from './Modal';
import FormControl from '../FormControl';
import { wishlistTypes } from '../WishlistHead';
//import useSecrets from '../../hooks/useSecrets';

const WishlistUpsertForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const isOpen = useSelector((state: RootState) => state.wishlists.upsertWishlistModalOpen);
  const wishlist = useSelector((state: RootState) => state.wishlists.upsertWishlist);
  const { addWishlist, updateWishlist, fetchWishlists } = useFirestore();
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [icon, setIcon] = useState('');
  const [type, setType] = useState<TWishlist['type']>("private");
  const [password, setPassword] = useState<string | null>(null);
  const [isNewModel, setIsNewModel] = useState<boolean>(false);

  //const {setSecret, getSecret} = useSecrets();

  useEffect(() => {
    if (wishlist) {
      setTitle(wishlist.title);
      setComment(wishlist.comment);
      setIcon(wishlist.icon);
      setType(wishlist.type);
      setPassword(null/*getSecret(wishlist.id!)*/);
      setIsNewModel(false);
    } else {
      setTitle('');
      setComment('');
      setIcon('');
      setType('private');
      setPassword(null);
      setIsNewModel(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  const onClose = () => {
    dispatch(closeUpsertWishlistModal());
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (wishlist) {
      /*if (type === 'secret') {
        setSecret(wishlist.id!, password!);
      }*/
      await updateWishlist({
        id: wishlist.id,
        uid: wishlist.uid,
        title,
        comment,
        icon,
        type,
        createdAt: wishlist.createdAt,
        updatedAt: (new Date()).toISOString(),
        items: wishlist.items,
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newId = await addWishlist({
        uid: user.uid!,
        title,
        comment,
        icon,
        type,
        createdAt: (new Date()).toISOString(),
        updatedAt: (new Date()).toISOString(),
        items: [],
      });
      /*if (type === 'secret') {
        setSecret(newId!, password!);
      }*/
    }
    fetchWishlists(user.uid!);

    setTitle('');
    setComment('');
    setIcon('');
    setType('private');
    setPassword(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
          {isNewModel ? 'Create New Wishlist' : 'Edit Wishlist'}
        </h3>

        <FormControl
          name='title'
          label='Title'
          value={title}
          setValue={setTitle}
        />
        <FormControl
          name='comment'
          label='Comment'
          value={comment}
          setValue={setComment}
          type='textarea'
        />
        <FormControl
          name='icon'
          label='Icon'
          value={icon}
          setValue={setIcon}
        />
        <FormControl
          name='type'
          label='Type'
          value={type}
          setValue={(v) => setType(v as TWishlist['type'])}
          options={Object.entries(wishlistTypes).filter(([k]) => k !== 'secret').map(([k, v]) => ({ label: v, value: k}))}
          type='select'
        />
        {type === 'secret' && (
          <FormControl
            name='password'
            label='Password'
            value={password || ''}
            setValue={setPassword}
            type='text'
          />
        )}
        
        <ModalButtons onClose={onClose} submitText={isNewModel ? 'Create' : 'Update'} />
      </form>
    </Modal>
  );
};

export default WishlistUpsertForm;
