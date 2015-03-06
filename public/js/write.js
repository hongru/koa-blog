;
(function($, Editor, window) {

	var id = postId;

	function submitPost() {
		var post = {
			title: $('#txtTitle').val().trim(),
            tags: $.map($('#ulTagItemList').children(),function(el){
                return $(el).find('input').val();
            }),
			content: $('#txtContent').val().trim()
		};

		var url = (id === "") ? "/posts/write": ("/posts/update/" + id);
		$.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify(post),
			dataType: "json",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(res) {
			if (res.code === "S_OK") {
				window.location.href = "/";
				return;
			}

		}).fail(function() {

		});
	}

    function showTagListTip () {
        var val = $(this).val().trim();

        if (val === "") {
            $('#ulTagList').hide();
            return;
        }

        var htmlBuf = [];
        htmlBuf.push('<li><a href="javascript:;">' + val + '</a></li>');

        $.each(tagList, function(index,tag) {
            if (tag.indexOf(val) > -1) {
                htmlBuf.push('<li>' + ('<a href="javascript:;">' + tag + '</a>') + '</li>');
            }
        })
        $("#ulTagList").html(htmlBuf.join('')).show().children().eq(0).addClass('active');
    }

    function createTag(name) {
        $('#ulTagItemList').append('<li><input type="text" value="' + name + '" readonly/><a href="javascript:;">×</a></li>').show();
    }

    function setSelectedTag (e) {
        var target = $(e.target);

        if (target.is("ul")) {
            return;
        }

        if (target.is("li")) {
            target = target.find('a');
        }

        var selectedTag = target.html();
        createTag(selectedTag);
        $('#txtTag').val("");
        $('#ulTagList').hide();
    }

    function removeSelectedTag(e) {
        var target = $(e.target);
        if (!target.is('a')) {
            return;
        }
        target.parent().remove();   
    }

	function initEvents() {
		$("#btnSubmit").on('click', submitPost);
        $('#txtTag').on('keyup', showTagListTip);
        $("#ulTagList").on('click',setSelectedTag);
        $('#ulTagItemList').on('click',removeSelectedTag);
	}

	$(function() {
		new Editor("txtContent", "divToolbar", {
			preview: "divPreview"
		});
		initEvents();
	});

})(jQuery, WMD, window);

