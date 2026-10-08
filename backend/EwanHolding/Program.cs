using EwanHolding.Api.Filters;
using EwanHolding.Api.Middlewares;
using EwanHolding.Api.Services;
using EwanHolding.Application.Repositories.Implementation;
using EwanHolding.Application.Repositories.Interfaces;
using EwanHolding.Application.Services.Implementation;
using EwanHolding.Application.Services.Interfaces;
using EwanHolding.Application.UnitOfWork;
using EwanHolding.Application.Validators;
using EwanHolding.Infrastructure.Persistence;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });
builder.Services.AddOpenApi();


var corsPolicyName = "EwanHoldingFrontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy
            .WithOrigins(
                  "http://localhost:4200",
                 "http://localhost:4201",
                "http://localhost:55155",
               "http://localhost:60751",
               "http://localhost:58492"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


builder.Services.AddDbContext<EwanHoldingDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);


builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,

            ValidIssuer =
                builder.Configuration["AppSettings:Issuer"],

            ValidateAudience = true,

            ValidAudience =
                builder.Configuration["AppSettings:Audience"],

            ValidateLifetime = true,

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration["AppSettings:token"]!
                    )
                ),

            ValidateIssuerSigningKey = true
        };
    });


builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<ICoreValueService, CoreValueService>();
builder.Services.AddScoped<IStatService, StatService>();
builder.Services.AddScoped<
    IInvestmentOpportunitiesService,
    InvestmentOpportunitiesService
>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IMediaService, MediaService>();
builder.Services.AddScoped<
    ITermsAndConditionsService,
    TermsAndConditionsService
>();
builder.Services.AddScoped<IPageContentService, PageContentService>();


builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<ICoreValueRepository, CoreValueRepository>();
builder.Services.AddScoped<IStatRepository, StatRepository>();
builder.Services.AddScoped<
    IInvestmentOpportunitiesRepository,
    InvestmentOpportunitiesRepository
>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();
builder.Services.AddScoped<
    ITermsAndConditionsRepository,
    TermsAndConditionsRepository
>();
builder.Services.AddScoped<IPageContentRepository, PageContentRepository>();
builder.Services.AddScoped<ICompanyFeatureService, CompanyFeatureService>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<
    IFileStorageService,
    LocalFileStorageService
>();


builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
});

builder.Services.AddValidatorsFromAssemblyContaining<
    CreateMediaValidator
>();


var app = builder.Build();


app.UseGlobalExceptionHandling();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}



app.UseStaticFiles();


app.UseCors(corsPolicyName);


app.UseAuthentication();

app.UseMiddleware<AdminEmailSetupMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();