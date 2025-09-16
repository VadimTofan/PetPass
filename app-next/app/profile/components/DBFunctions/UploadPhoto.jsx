// "use client";

// import { useRef, useState, useCallback } from "react";
// import Image from "next/image";
// import styles from "../../pets/[pet]/page.module.css";

// export default function UploadPhoto() {
//   const inputRef = useRef(null);
//   const [preview, setPreview] = useState("");
//   const [fileName, setFileName] = useState("");

//   const openPicker = () => inputRef.current?.click();

//   const loadPreview = (file) => {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setPreview(reader.result?.toString() || "");
//     reader.readAsDataURL(file);
//     setFileName(file.name);
//   };

//   const onChange = (e) => {
//     const file = e.target.files?.[0];
//     loadPreview(file);
//   };

//   const onDrop = useCallback((e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (!file) return;
//     const dt = new DataTransfer();
//     dt.items.add(file);
//     if (inputRef.current) inputRef.current.files = dt.files;
//     loadPreview(file);
//   }, []);

//   const onDragOver = (e) => e.preventDefault();

//   return (
//     <div className={styles.petProfile__upload} onDrop={onDrop} onDragOver={onDragOver}>
//       <div className={styles.petProfile__drop}>
//         <div className={styles.petProfile__hintRow}>
//           <span>Drag & drop an image here, or</span>
//           <button type="button" onClick={openPicker} className={styles.petProfile__browse}>
//             Browse…
//           </button>
//         </div>

//         <input ref={inputRef} type="file" id="photo" name="photo" accept="image/*" style={{ display: "none" }} onChange={onChange} />

//         {preview ? (
//           <div className={styles.petProfile__preview}>
//             <Image src={preview} alt="Pet photo preview" width={120} height={120} className={styles.petProfile__previewImg} />
//             <div className={styles.petProfile__fileMeta}>
//               <div className={styles.petProfile__fileName}>{fileName}</div>
//               <button type="button" onClick={openPicker} className={styles.petProfile__browse}>
//                 Change
//               </button>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }
