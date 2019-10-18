{
  "targets": [{
    "target_name": "addon_b",
    "include_dirs": [
      "<!(node -e \"require('napi-macros')\")"
    ],
    "sources": [
      "../binding.cc"
    ]
  }]
}
