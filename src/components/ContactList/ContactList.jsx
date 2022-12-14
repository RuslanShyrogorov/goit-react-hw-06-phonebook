import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

import {
  ListContact,
  ItemContact,
  ButtonDelContact,
} from './ContactList.styled';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContact = filteredContacts();

  const contactItem = visibleContact.map(({ id, name, number }) => (
    <ItemContact key={id}>
      <p>{`${name}: ${number}`}</p>
      <ButtonDelContact
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </ButtonDelContact>
    </ItemContact>
  ));

  return <ListContact>{contactItem}</ListContact>;
}
