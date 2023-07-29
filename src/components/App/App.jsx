import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import { TitlePhonebook } from './TitlePhonebook.styled';
import { TitleContacts } from './TitleContacts.styled';
import {
  deleteContact,
  setContacts,
  setFilter,
} from 'redux/contactsDetailsReducer';

export const App = () => {
  const contacts = useSelector(state => state.contactsDetails.contacts);
  const filter = useSelector(state => state.contactsDetails.filter);
  const dispatch = useDispatch();

  const addContact = (name, number) => {
    const contactExists = duplicationContacts(name);
    if (contactExists) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(setContacts(contact));
  };

  const changeFilter = event => {
    dispatch(setFilter(event.target.value));
  };

  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContacts = contactId => {
    dispatch(deleteContact(contactId));
  };

  const duplicationContacts = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filteredContacts = findContacts();

  return (
    <div>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm onSubmit={addContact} />
      <TitleContacts>Contacts</TitleContacts>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContacts}
      />
    </div>
  );
};
