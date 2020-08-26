<?
define("PAGE", "home-page");
require_once './includes/start.php';
?>

<div class="content">
    <div class="wrap">

        <h1 class="v-view_b">Front-end Starter</h1>

        <div class="text" data-view-parent="v-view_b">

            <p>
                <a href="test.php" class="v-al">go to the test page (through AJAX) --</a>
            </p>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora aperiam perspiciatis enim sint quo error? Maiores vitae sapiente consequatur alias deleniti ducimus, rem dolorem? Eius nesciunt voluptatem fuga non pariatur.</p>

            <h2>Header 2</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque harum repellat iure ab non illo, dolorum, amet odit facere dignissimos libero sit quis eligendi veniam id voluptate nulla dolorem molestias?</p>

            <h3>Header 3</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque harum repellat iure ab non illo, dolorum, amet odit facere dignissimos libero sit quis eligendi veniam id voluptate nulla dolorem molestias?</p>

            <h4>Header 4</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque harum repellat iure ab non illo, dolorum, amet odit facere dignissimos libero sit quis eligendi veniam id voluptate nulla dolorem molestias?</p>

            <h5>Header 5</h5>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque harum repellat iure ab non illo, dolorum, amet odit facere dignissimos libero sit quis eligendi veniam id voluptate nulla dolorem molestias?</p>

            <h6>Header 6</h6>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque harum repellat iure ab non illo, dolorum, amet odit facere dignissimos libero sit quis eligendi veniam id voluptate nulla dolorem molestias?</p>

            <ul>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
            </ul>

            <blockquote>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione ullam deleniti doloribus commodi reprehenderit, reiciendis magnam pariatur mollitia veritatis consequatur, eaque sequi minus repellendus porro, adipisci natus officiis unde earum?
            </blockquote>

            <ol>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
            </ol>

            <img src="https://picsum.photos/seed/picsum/1440/400" alt="">

            <h4>Lazy Image</h4>
            <div class="lazy-bg" data-src="https://picsum.photos/seed/picsum1/1440/500" style="padding-top: 40%;"></div>

        </div>

    </div>
</div>

<? require_once './includes/end.php'; ?>