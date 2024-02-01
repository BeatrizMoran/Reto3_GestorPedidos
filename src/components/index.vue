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
            <div class="col-md-6 mb-3 d-flex align-items-center justify-content-center"> 
                <p :class="{ 'fade-in': showText === 1, 'fade-out': showText !== 1 }" class="text-center text-gray">Sumérgete en el mundo de la cerveza artesanal con Cervezas Killer, donde la pasión por la calidad y la innovación se fusionan para ofrecerte una experiencia cervecera única. Desde nuestros inicios, nos hemos comprometido a desafiar los límites de la tradición cervecera, creando cervezas que deleitan los paladares más exigentes y cautivan a los amantes de la buena cerveza.</p> 
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
            <div class="col-md-6 mb-3 order-md-first d-flex align-items-center justify-content-center">
                <p :class="{ 'fade-in': showText === 2, 'fade-out': showText !== 2 }" class="text-center text-gray">En Cervezas Killer, no solo fabricamos cerveza; creamos obras maestras líquidas, cada una con su propio carácter distintivo y su historia única. Desde las cervezas de estilo clásico hasta las audaces y creativas innovaciones, cada sorbo es una invitación a explorar nuevos horizontes sensoriales.</p> 
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
        <p :class="{ 'fade-in': showText === 3, 'fade-out': showText !== 3 }" class="text-center text-gray">Explora nuestro catálogo, descubre nuestras últimas creaciones, sumérgete en la cultura cervecera y únete a la comunidad de Cervezas Killer, donde la pasión por la cerveza une a personas de todo el mundo.</p>
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
        <p :class="{ 'fade-in': showText === 4, 'fade-out': showText !== 4 }" class="text-center text-gray">¡Prepárate para una experiencia cervecera que despierte tus sentidos y eleve tu gusto por la cerveza a nuevas alturas! ¡Bienvenido a Cervezas Killer, donde cada cerveza es una obra maestra en sí misma!</p>
    </div>
</div>
</div>

</template>
  
  
<script setup>
import { ref } from 'vue';

const showText = ref(0);

const toggleText = (section) => {
    try {
        if (showText.value === section) {
            showText.value = 0; 
         } 
            else {
                showText.value = section; 
            }
        
    } 
    catch (error) {
            alert(error);
    }

};

const hoverImage = (section) => {
    try {

        const image = document.querySelector(`.clickable-image[data-section="${section}"]`);
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
         } 
         catch (error) {
        alert(error);
    }

};

const unhoverImage = (section) => {
    try {
        const image = document.querySelector(`.clickable-image[data-section="${section}"]`);
        if (image) {
            image.style.transform = 'scale(1)';
        }
    }
    catch (error) {
        alert(error);
    }
};
</script>


  
<style lang="scss" scoped>
@import '../assets/style.scss';
</style>