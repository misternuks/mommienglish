'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import styles from '../../admin.module.css';
import Image from 'next/image';
import { cloudinaryLoader } from '@/utils/cloudinaryLoader';
import Link from 'next/link';

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function NewWorkshopPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    href: '',
    heading: '',
    title: '',
    password: '',
    imageUrl: '',
  });
  const [uploading, setUploading] = useState<boolean>(false);

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrl: result.info.secure_url,
          }));
        } else if (error) {
          console.error('Upload Widget Error:', error);
          alert('An error occurred during image upload.');
        }
      }
    );
    widget.open();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (Object.values(formData).some((field) => !field)) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setUploading(true);

      // Send data to the API to create the workshop
      const res = await fetch('/api/admin/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/workshops');
      } else {
        alert('Failed to create workshop.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred.');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      {/* Include the Cloudinary Upload Widget script */}
      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="beforeInteractive" />
      <h1>Create New Workshop</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Href (Link):</label>
          <input
            type="url"
            name="href"
            value={formData.href}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Heading:</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.imageEdit}>
          <label>Image:</label>
          <button className={styles.editButton} type="button" onClick={openWidget}>
            Upload Image
          </button>
          {formData.imageUrl && (
            <div className={styles.imageInfo}>
              <p>Image Uploaded Successfully</p>
              <Image
                src={formData.imageUrl}
                alt="Current Image"
                width={150}
                height={150}
                loader={cloudinaryLoader}
                unoptimized
              />
            </div>
          )}
        </div>
        <button className={styles.createButton} type="submit" disabled={uploading}>
          {uploading ? 'Submitting...' : 'Create Workshop'}
        </button>
      </form>
      <Link href="/admin/workshops/">
        <button className={styles.backButton}>Back to Workshops</button>
      </Link>
    </div>
  );
}
