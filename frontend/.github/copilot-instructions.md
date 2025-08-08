### **Project Spec: A Personalized Media Canvas**

This is a Vite + React frontend for the Insta-clone project. Use best practices for API integration, authentication, and state management. Avoid demo code and keep components modular.

---

### **User Experience and Core Concept**

The user experience should feel like building and curating a living, personal art collage. Instead of a linear, scroll-based feed, the user is presented with a large, interactive **canvas**. This canvas is a dynamic space where all their media—photos, videos, and collections—live. The user can arrange, resize, and prioritize content based on its personal significance.

The interface prioritizes **direct manipulation** and personalization, allowing the user to make certain relationships or memories physically larger and more prominent on their canvas.

---

### **Core Interaction Paradigms**

1.  **The Canvas: A Dynamic Workspace**
    * **Visual Metaphor:** The main interface is a vast, two-dimensional canvas. It can be thought of as a digital bulletin board, a scrapbook, or a personalized wall of memories.
    * **Navigation:** Users can pan across the canvas to view different areas and zoom in and out to adjust their perspective. A mini-map or overview tool could help navigate very large canvases.
    * **Content Representation:** Each piece of media (an image, a video, a collection) is a resizable, draggable element on the canvas. These elements can be placed anywhere, creating a non-linear, personalized arrangement.

2.  **Direct Manipulation and Resizing**
    * **Prioritizing Content:** The core interaction is the ability to **resize** media elements. By making a photo of a family member larger, the user is visually and functionally prioritizing that content. Conversely, an element from a random account can be shrunken to take up less space.
    * **Groups and Collections:** Media can be grouped into collections, which are represented as resizable containers on the canvas. For example, a "Friends" collection could be a large, dynamic block on the canvas that contains smaller, individual media elements. The entire block can be resized and moved as a single unit.
    * **Responsive Layout:** The layout of the canvas is not fixed. As the user resizes one element, surrounding elements might dynamically shift to accommodate the change, creating a fluid, organic feel.

---

### **Key Functional Requirements & Design Elements**

* **Media Upload:**
    * Users can "pin" new media to an empty spot on the canvas.
    * A simple drag-and-drop from the desktop would place the new media directly onto the canvas.
* **Media Browse & Discovery:**
    * Users can browse their canvas by simply panning and zooming.
    * There could be a search function that highlights relevant media on the canvas, or temporarily reorganizes the canvas to bring all matching media to the forefront.
    * Pre-set views could be offered, such as a "chronological" layout that temporarily organizes media by date.
* **Media Organization:**
    * **Grouping:** Users can drag media elements on top of each other to create a stack, forming a collection.
    * **Customization:** Each collection could have a title or a custom background color to distinguish it. Users could also choose to display the collection as a single, large image or a collage of the contained media.
* **Media Sharing & Collaboration:**
    * Sharing would involve selecting an element or a collection and "sending" it to another user. This could be represented visually by the element animating from the user's canvas to the recipient's.
    * For collections, a "shared canvas" feature could allow multiple users to collaborate on a single section, arranging and adding media together.
* **Media Interaction & Basic Editing:**
    * Clicking on a media element would expand it into a full-screen view for closer inspection, and basic editing tools (cropping, filters) could be accessed there.
    * Videos would play directly on the canvas, and their size would determine their visual prominence.

---

### **Visual Design & Aesthetics**

* **Minimalist & Functional UI:** UI controls (like a zoom slider or search bar) would be minimal and unobtrusive, appearing only when needed.
* **Clean and Direct:** The focus is on the content itself. Media elements would have clean borders and shadows to give them a tangible, "pasted-on" feel.
* **Fluid Transitions:** All movements—panning, zooming, resizing—should be smooth and animated, making the experience feel responsive and alive.
* **Layering:** Elements can be layered on top of each other, creating a sense of depth and allowing users to prioritize certain pieces of media over others.