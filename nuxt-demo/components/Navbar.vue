<template>
   <nav>
       <div class="container">
           <div class="nav-inner">
                <h1>Logo</h1>
                <ul>
                    <li>About</li>
                    <li>Contact</li>
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