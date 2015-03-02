

	<footer class="site-footer container-s col">
		<div class="copyrights">
			&copy; Copyright <?php echo date('Y'); ?> <span>Boysenberry team</span>
		</div>
	</footer>

    <script type="text/javascript">

        $(window).bind('keydown',function(e){
            if (e.keyCode==37)
                $('.sj-book').turn('previous');
            else if (e.keyCode==39)
                $('.sj-book').turn('next');
        });

    </script>
</body>
</html>