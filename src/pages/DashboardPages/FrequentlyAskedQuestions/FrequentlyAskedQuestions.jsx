import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { Button, Card, Form, Input, Modal, Space } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';
import TextArea from 'antd/es/input/TextArea';
import toast from 'react-hot-toast';

function FrequentlyAskedQuestions() {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [faqs, setFaqs] = useState([
    {
      question: 'How do I book an appointment?',
      answer:
        'Fill in the required details, including your full name, email address, and a secure password. Ensure your email is valid as it will be used for account verification and communication.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        'Go to your account settings, click on "Change Password", and follow the instructions to reset your password.',
    },
  ]);

  const handleAddClick = () => {
    setEditingIndex(null);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleSubmit = (values) => {
    if (editingIndex !== null) {
      const updatedFaqs = [...faqs];
      updatedFaqs[editingIndex] = values;
      setFaqs(updatedFaqs);
      toast.success('FAQ updated successfully!');
    } else {
      setFaqs([...faqs, values]);
      toast.success('FAQ added successfully!');
    }
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
    toast.success('FAQ deleted successfully!');
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between !w-full mb-12">
        <div className="w-full bg-white flex items-center justify-between pr-12 shadow-sm rounded-lg">
          <PageHeading title={'FAQ'} />
          <Button
            style={{
              width: '200px',
              backgroundColor: 'var(--bg-green-high)',
              color: 'var(--text-light)',
            }}
            onClick={handleAddClick}
          >
            <FaPlus />
            Add FAQ
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {faqs.map((item, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between my-4">
              <h1>{item.question}</h1>
              <Space>
                <Button onClick={() => handleEdit(index)}>
                  <FaEdit />
                </Button>
                <Button onClick={() => handleDelete(index)}>
                  <AiTwotoneDelete />
                </Button>
              </Space>
            </div>
            <p>{item.answer}</p>
          </Card>
        ))}
      </div>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        title={editingIndex !== null ? 'Edit FAQ' : 'Add New FAQ'}
      >
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={
            editingIndex !== null
              ? faqs[editingIndex]
              : { question: '', answer: '' }
          }
        >
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: 'Please enter a question' }]}
          >
            <Input placeholder="Enter your question" />
          </Form.Item>

          <Form.Item
            label="Answer"
            name="answer"
            rules={[{ required: true, message: 'Please enter an answer' }]}
          >
            <TextArea
              maxLength={300}
              placeholder="Enter your answer"
              rows={4}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end">
              <Button className='!bg-[var(--bg-green-high)] !text-white' htmlType="submit">
                {editingIndex !== null ? 'Update FAQ' : 'Save FAQ'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FrequentlyAskedQuestions;
