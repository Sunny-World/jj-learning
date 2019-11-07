# IDEA
## IDEA里五种目录类型简介（Mark Directory as）
通过File  -> Settings-project Structure-Modules 或者右键Mark Directory as可以找到这五种类型。

Sources 一般用于标注类似 src 这种可编译目录。有时候我们不单单项目的 src 目录要可编译，还有其他一些特别的目录也许我们也要作为可编译的目录，就需要对该目录进行此标注。只有 Sources 这种可编译目录才可以新建 Java 类和包。在规范的 maven 项目结构中，顶级目录是 src，但maven 的 src 我们是不会设置为 Sources 的，而是在其子目录src - main -java ，我们会设置java目录为 Sources。

Tests 一般用于标注可编译的单元测试目录。而单元测试的目录是 src - test - java，我们会设置java目录为 Tests，表示该目录是作为可编译的单元测试目录。一般这个和后面几个我们都是在 maven 项目下进行配置的，可以看出 IntelliJ IDEA 对 maven 项目的支持是比彻底的。

Resources 一般用于标注资源文件目录。在 maven 项目下，资源目录是单独划分出来的，其目录为：src - main -resources，我们会设置resources 目录为 Resources，表示该目录是作为资源目录。资源目录下的文件是会被编译到输出目录下的。

Test Resources 一般用于标注单元测试的资源文件目录。在 maven 项目下，单元测试的资源目录是单独划分出来的，其目录为：src - test -resources，我们会设置resources 目录为 Test Resources，表示该目录是作为单元测试的资源目录。资源目录下的文件是会被编译到输出目录下的。

Excluded 一般用于标注排除目录。被排除的目录不会被 IntelliJ IDEA 创建索引，相当于被 IntelliJ IDEA 废弃，该目录下的代码文件是不具备代码检查和智能提示等常规代码功能。