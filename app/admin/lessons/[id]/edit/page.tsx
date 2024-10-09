// app/admin/lessons/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../admin.module.css';
import { Lesson } from '@/types/lesson';
import Image from 'next/image';
import Script from 'next/script';
import { cloudinaryLoader } from '@/utils/cloudinaryLoader';
import Link from 'next/link';

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function EditLessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id;

  type FormDataType = Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>;
  const [formData, setFormData] = useState<FormDataType>({
    href: '',
    heading: '',
    title: '',
    password: '',
    imageUrl: '',
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      const res = await fetch(`/api/admin/lessons/${lessonId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          href: data.href,
          heading: data.heading,
          title: data.title,
          password: data.password,
          imageUrl: data.imageUrl,
        });
      } else {
        alert('Failed to fetch lesson data.');
        router.push('/admin/lessons');
      }
    };

    fetchLesson();
  }, [lessonId, router]);

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

      // Send updated data to the API
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/lessons');
      } else {
        alert('Failed to update lesson.');
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
      <h1>Edit Lesson</h1>
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
        <div>
          <label>Current Image:</label>
          {formData.imageUrl ? (
            <Image
              src={formData.imageUrl}
              alt="Current Image"
              width={150}
              height={150}
              priority
            />
          ) : (
            <p>No image uploaded.</p>
          )}
        </div>
        <div className={styles.imageEdit}>
          <label>Change Image:</label>
          <button type="button" className={styles.editButton} onClick={openWidget}>
            Upload New Image
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
          {uploading ? 'Updating...' : 'Update Lesson'}
        </button>
      </form>
      <Link href="/admin/lessons/">
        <button className={styles.backButton}>Back to Lessons</button>
      </Link>
    </div>
  );
}
