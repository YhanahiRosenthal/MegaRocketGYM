import React, { useState } from 'react';
import styles from './form.module.css';
import { ModalConfirm } from '../../Shared';
import { ModalSuccess } from '../../Shared';
import { Inputs, Button /* , OptionInput */ } from '../../Shared';

export const MembersForm = () => {
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [member, setMember] = useState({});
  /*  const memberships = ['Black', 'Classic', 'Only Classes']; */

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: true
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetch(`${process.env.REACT_APP_API_URL}/member/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: member.firstName,
          lastName: member.lastName,
          dni: member.dni,
          birthday: member.birthday,
          phone: member.phone,
          email: member.email,
          city: member.city,
          postalCode: member.postalCode,
          isActive: member.isActive,
          membership: member.membership
        })
      });
      setModalSuccessOpen(true);
      setSuccessMessage('Member added successfully!');
      setMember({
        firstName: '',
        lastName: '',
        dni: '',
        birthday: '',
        phone: '',
        email: '',
        city: '',
        postalCode: '',
        isActive: false,
        membership: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {modalAddConfirmOpen && (
          <ModalConfirm
            method="Add"
            onConfirm={handleSubmit}
            setModalConfirmOpen={setModalAddConfirmOpen}
            message="Are you sure you want to edit this member?"
          />
        )}
        {modalSuccessOpen && (
          <ModalSuccess setModalSuccessOpen={setModalSuccessOpen} message={successMessage} />
        )}
      </div>
      <h3 className={styles.title}>Add Member</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Name"
                text={member.firstName}
                type="text"
                change={handleChange}
                nameInput="firstName"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Lastname"
                text={member.lastName}
                type="text"
                change={handleChange}
                nameInput="lastName"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="DNI"
                text={member.dni}
                type="text"
                change={handleChange}
                nameInput="dni"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Birthday"
                text={member.birthday}
                type="date"
                change={handleChange}
                nameInput="birthday"
                required
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Phone"
                text={member.phone}
                type="number"
                change={handleChange}
                nameInput="phone"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Email"
                text={member.email}
                type="email"
                change={handleChange}
                nameInput="email"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="City"
                text={member.city}
                type="text"
                change={handleChange}
                nameInput="city"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Postal Code"
                text={member.postalCode}
                type="number"
                change={handleChange}
                nameInput="postalCode"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                nameTitle="Membership"
                text={member.membership}
                type="text"
                change={handleChange}
                nameInput="membership"
                required
              />
              {/* <OptionInput dataOptions={memberships} nameInput="membership" /> */}
            </div>
          </div>
        </section>
        <div className={styles.buttonContainer}>
          <Button clickAction={handleSubmit} text="Submit" />
          <Button text="cancel" />
        </div>
      </form>
    </div>
  );
};
