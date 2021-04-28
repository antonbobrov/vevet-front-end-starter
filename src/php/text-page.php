<?
define("PAGE", "text-page");
require_once './includes/start.php';
?>

<div class="page-content">
    <div class="wrap_1">

        <h1 class="v-view_b">Test Text Styles</h1>
        <br><br>

        <text-content class="text" data-view-parent="v-view_b">
            <p><strong>Lorem</strong> ipsum <em>dolor</em> sit <span style="text-decoration: underline;">amet</span>, <span style="text-decoration: line-through;">consectetur</span> <sub>adipiscing</sub> elit. Pharetra <sup>turpis</sup> habitasse amet, enim bibendum quis lectus habitant. Ut nisi, dolor adipiscing tellus viverra netus. Egestas pulvinar cras pellentesque pulvinar id nec. Tristique in malesuada vulputate nulla elementum sit pharetra faucibus. Sit libero sem leo arcu elementum sit amet. Elementum proin nunc lorem ante vivamus volutpat feugiat viverra egestas.</p>
            <ul>
                <li>Lorem</li>
                <li>Ipsum</li>
                <li>Dolor</li>
            </ul>
            <hr />
            <p> </p>
            <p class="justifyleft">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra turpis habitasse amet, enim bibendum quis lectus habitant. Ut nisi, dolor adipiscing tellus viverra netus. Egestas pulvinar cras pellentesque pulvinar id nec. Tristique in malesuada vulputate nulla elementum sit pharetra faucibus. Sit libero sem leo arcu elementum sit amet. Elementum proin nunc lorem ante vivamus volutpat feugiat viverra egestas.</p>
            <ol>
                <li>Sit</li>
                <li>Amet</li>
            </ol>
            <p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra turpis habitasse amet, enim bibendum quis lectus habitant. Ut nisi, dolor adipiscing tellus viverra netus. Egestas pulvinar cras pellentesque pulvinar id nec. Tristique in malesuada vulputate nulla elementum sit pharetra faucibus. Sit libero sem leo arcu elementum sit amet. Elementum proin nunc lorem ante vivamus volutpat feugiat viverra egestas.</p>
            <p class="justifyright">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra turpis habitasse amet, enim bibendum quis lectus habitant. Ut nisi, dolor adipiscing tellus viverra netus. Egestas pulvinar cras pellentesque pulvinar id nec. Tristique in malesuada vulputate nulla elementum sit pharetra faucibus. Sit libero sem leo arcu elementum sit amet. Elementum proin nunc lorem ante vivamus volutpat feugiat viverra egestas.</p>
            <p class="justifyfull">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra turpis habitasse amet, enim bibendum quis lectus habitant. Ut nisi, dolor adipiscing tellus viverra netus. Egestas pulvinar cras pellentesque pulvinar id nec. Tristique in malesuada vulputate nulla elementum sit pharetra faucibus. Sit libero sem leo arcu elementum sit amet. Elementum proin nunc lorem ante vivamus volutpat feugiat viverra egestas.</p>
            <p class="justifyfull"> </p>
            <h1 class="justifyleft">Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
            <h5>Header 5</h5>
            <h6>Header 6</h6>
            <blockquote>Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote Lorem ipsum dolor sit amet quote</blockquote>
            <h3>Image Without Styles</h3>
            <p><img src="https://picsum.photos/id/237/300/200" alt="" /></p>
            <h3>Iframe</h3>
            <p><iframe src="https://www.youtube.com/embed/LjCzPp-MK48" width="320" height="240"></iframe></p>
            <h3>Image With Styles</h3>
            <p>Text</p>
            <p><img style="float: left;" src="https://picsum.photos/id/237/300/200" alt="" width="150" height="84" />Text Lorem ipsum dolor sit amet</p>
        </text-content>
        <div class="clear"></div>

    </div>
</div>

<? require_once './blocks/footer.php'; ?>

<? require_once './includes/end.php'; ?>