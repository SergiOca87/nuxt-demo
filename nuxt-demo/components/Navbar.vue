<template>
   <nav>
       <div class="container">
           <div class="nav-inner">
                <h1>
                    <NuxtLink to="/">Nuxt Demo</NuxtLink>
                </h1>
                <ul>
                    <li>
                        <NuxtLink to="/properties">Properties</NuxtLink>
                    </li>
                </ul>
           </div>
       </div>
   </nav>
</template>

<style lang="scss">
    nav {
        
        height: 12rem;
        background-color: aliceblue;
    }
    .nav-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;

        ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }   
</style>