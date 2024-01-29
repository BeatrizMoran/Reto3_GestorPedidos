<script setup>

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center justify-content-between">

        <!-- Botón desplegable -->
        <div class="col-2 col-lg-1 px-4">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>


        <!-- Logo -->
        <div class="col-2 col-lg-1 px-1 text-center">
          <img src="../assets/logo.png" alt="Logo" class="img-fluid">
        </div>


        <!-- Contenido del navbar -->
        <div class="collapse navbar-collapse col-md-5 col-lg-6 px-4" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Productos</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pedidos
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Perfil</a>
            </li>
            <li class="nav-item">
              <input class="form-control form-control-sm " type="search" placeholder="Insertar Código..." aria-label="Codificacion" enabled>
            </li>
          </ul>
        </div>


        <!-- Buscador -->
        <div class="col-7 col-md-7 col-lg-4 px-4">
          <form class="d-flex">
            <input class="form-control me-2 flex-grow-1" type="search" placeholder="Buscar..." aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>


      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import '../assets/style.scss';

img {
  max-width: 100%; 
  height: auto; 
  max-height: 50px; 
}

</style>
