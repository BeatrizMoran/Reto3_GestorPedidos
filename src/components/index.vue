<template>

    <div class="container">
        <!-- Primer sección -->
        <div class="row">
            <!-- Imagen a la izquierda, texto a la derecha -->
            
            <div class="col-md-6 mb-3">
                <div class="image-container">
                    <img src="../assets/cerveza1.jpg" alt="Cerveza 1" @click="toggleText(1)" class="img-fluid clickable-image" :class="{ clicked: showText === 1 }" @mouseover="hoverImage(1)" @mouseleave="unhoverImage(1)" data-section="1">
                </div>
            </div>
            <div class="col-md-6 mb-3 d-flex align-items-center justify-content-center"> <!-- Aquí se agregan las clases de Bootstrap para centrar y alinear -->
                <p :class="{ 'fade-in': showText === 1, 'fade-out': showText !== 1 }" class="text-center text-gray">Texto a la izquierda de la primera imagen...Texto a la izquierda de la primera imagen...Texto a la izquierda de la primera imagen...Texto a la izquierda de la primera imagen...Texto a la izquierda de la primera imagen...Texto a la izquierda de la primera imagen...Texto a la izquierda de la primera imagen...</p> <!-- Se agrega la clase 'text-gray' para el color gris claro -->
            </div>
        </div>

        <!-- Espacio en blanco entre las secciones -->
        <div class="col-md-12 mb-3"><br> </div>
        <div class="col-md-12 mb-3"><br> </div>
        <div class="col-md-12 mb-3"><br> </div>



        <!-- Segunda sección -->
        <div class="row">
            <!-- Imagen a la derecha, texto a la izquierda -->
            <div class="col-md-6 mb-3 order-md-last">
                <div class="image-container">
                    <img src="../assets/cerveza2.jpg" alt="Cerveza 2" @click="toggleText(2)" class=" img-fluid clickable-image" :class="{ clicked: showText === 2 }" @mouseover="hoverImage(2)" @mouseleave="unhoverImage(2)" data-section="2">
                </div>
            </div>
            <div class="col-md-6 mb-3 order-md-first d-flex align-items-center justify-content-center"> <!-- Aquí se agregan las clases de Bootstrap para centrar y alinear -->
                <p :class="{ 'fade-in': showText === 2, 'fade-out': showText !== 2 }" class="text-center text-gray">Texto a la derecha de la primera imagen...Texto a la derecha de la primera imagen...Texto a la derecha de la primera imagen...Texto a la derecha de la primera imagen...Texto a la derecha de la primera imagen...Texto a la derecha de la primera imagen...Texto a la derecha de la primera imagen...Texto a la derecha de la primera imagen...</p> <!-- Se agrega la clase 'text-gray' para el color gris claro -->
            </div>
        </div>

        <!-- Espacio en blanco entre las secciones -->
        <div class="col-md-12 mb-3"><br> </div>
        <div class="col-md-12 mb-3"><br> </div>
        <div class="col-md-12 mb-3"><br> </div>
   

        <div class="row">
    <!-- Imagen a la izquierda, texto a la derecha -->
    <div class="col-md-6 mb-3">
        <div class="image-container">
            <img src="../assets/cerveza1.jpg" alt="Cerveza 1" @click="toggleText(3)" class="img-fluid clickable-image" :class="{ clicked: showText === 3 }" @mouseover="hoverImage(3)" @mouseleave="unhoverImage(3)" data-section="3">
        </div>
    </div>
    <div class="col-md-6 mb-3 d-flex align-items-center justify-content-center">
        <p :class="{ 'fade-in': showText === 3, 'fade-out': showText !== 3 }" class="text-center text-gray">Texto a la izquierda de la tercera imagen...</p>
    </div>
</div>

        <!-- Espacio en blanco entre las secciones -->
        <div class="col-md-12 mb-3"><br> </div>
        <div class="col-md-12 mb-3"><br> </div>
        <div class="col-md-12 mb-3"><br> </div>

<div class="row">
    <!-- Imagen a la derecha, texto a la izquierda -->
    <div class="col-md-6 mb-3 order-md-last">
        <div class="image-container">
            <img src="../assets/cerveza2.jpg" alt="Cerveza 2" @click="toggleText(4)" class="img-fluid clickable-image" :class="{ clicked: showText === 4 }" @mouseover="hoverImage(4)" @mouseleave="unhoverImage(4)" data-section="4">
        </div>
    </div>
    <div class="col-md-6 mb-3 order-md-first d-flex align-items-center justify-content-center">
        <p :class="{ 'fade-in': showText === 4, 'fade-out': showText !== 4 }" class="text-center text-gray">Texto a la derecha de la cuarta imagen...</p>
    </div>
</div>
</div>

</template>
  
  
<script setup>
import { ref } from 'vue';

const showText = ref(0);

const toggleText = (section) => {
    if (showText.value === section) {
        showText.value = 0; // Oculta el texto si ya está visible
    } else {
        showText.value = section; 
    }
};

const hoverImage = (section) => {
    const image = document.querySelector(`.clickable-image[data-section="${section}"]`);
    if (image) {
        image.style.transform = 'scale(1.1)';
    }
};

const unhoverImage = (section) => {
    const image = document.querySelector(`.clickable-image[data-section="${section}"]`);
    if (image) {
        image.style.transform = 'scale(1)';
    }
};
</script>


  
<style scoped>
.container {
  padding: 20px;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.clickable-image {
  cursor: pointer;
  transition: transform 0.3s ease-out;
}

/* Ocultar el texto inicialmente */
.fade-out {
    opacity: 0;
    transition: opacity 2s ease;
}

/* Mostrar el texto con transición */
.fade-in {
    opacity: 1;
    transition: opacity 1s ease;
}

.text-gray {
    color: whitesmoke; /* Gris claro */
    font-size: 1.5em; /* Tamaño de fuente más grande */
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px; /* Espaciado interno */
    border-radius: 10px;
}

</style>